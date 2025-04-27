import './scss/styles.scss';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { WebAPI } from './components/API';
import { API_URL, CDN_URL } from './utils/constants';
import { Page } from './models/Pages';
import { Modal } from './models/ModalForm';
import { Basket } from './models/BasketModel';
import { Card } from './models/CardModel';
import { Success } from './models/SuccessFrom';
import { ICatalogChangeEvent, Events, IFormErrors, ILot, IPayType } from './types';
import { AppState } from './models/AppState';
import { DeliveryForm } from './models/DeliveryForm';
import { ContactsForm } from './models/ContactsForm';
import { BasketItem } from './models/BasketItems';


const api = new WebAPI(CDN_URL, API_URL);
const events = new EventEmitter();

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');

const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');

const deliveryTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');


const appData = new AppState({}, events);


const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);


const basket = new Basket(cloneTemplate(basketTemplate), events);
const deliveryForm = new DeliveryForm(cloneTemplate(deliveryTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsTemplate), events);


events.on<ICatalogChangeEvent>(Events.CATALOG_UPDATED, () => {
	// Отрисовываем каждую карточку
	page.galery = appData.catalog.map((item) => {
		const card = new Card('card', cloneTemplate(cardCatalogTemplate), events, {
			onClick: () => events.emit(Events.LOT_OPENED, item),
		});
		return card.render({
			category: item.category,
			title: item.title,
			image: item.image,
			price: item.price,
		});
	});
});


events.on(Events.BASKET_OPENED, () => {
	modal.render({
		content: basket.render({
			validation: appData.getBasketLength() > 0
		}),
	});
});

events.on(Events.LOT_OPENED, (item: ILot) => {
	const card = new Card('card', cloneTemplate(cardPreviewTemplate), events, {
		onClick: () => {
			if (appData.isLotInBasket(item)) {
				item.removeFromBasket();
			} else {
				item.placeInBasket();
			}
			events.emit(Events.LOT_OPENED, item);
		},
	});

	modal.render({
		content: card.render({
			category: item.category,
			title: item.title,
			description: item.description,
			image: item.image,
			price: item.price,
			button: item.isOrdered ? 'Удалить' : 'Купить',
		}),
	});
});

events.on(Events.LOT_IN_BASKET_UPDATED, () => {
	page.counter = appData.getBasketLength();

	basket.items = appData.basket.map((item, index) => {
		const card = new BasketItem(cloneTemplate(cardBasketTemplate), events, {
			onClick: (event) => {
				item.removeFromBasket();  // TODO: может стоит вызывать event, а не метод
				events.emit(Events.BASKET_OPENED);
			},
		});
		return card.render({
			index: index,
			title: item.title,
			price: item.price,
		});
	});

	basket.total = appData.getTotalAmount();
});

events.on(Events.PAYMENT_STEP_OPENED, () => {
	const order = appData.initOrder();
	modal.render({
		content: deliveryForm.render({
			payment: order.payment,
			address: order.address,
			valid: false,
			errors: [],
		}),
	});
});

events.on(Events.PAYMENT_METHOD_CHANGED, (data: { target: string }) => {
	appData.order.payment = data.target as IPayType;
});

events.on(Events.ADDRESS_CHANGED, (data: { value: string }) => {
	appData.order.address = data.value;
});

events.on(Events.EMAIL_CHANGED, (data: { value: string }) => {
	appData.order.email = data.value;
});

events.on(Events.PHONE_CHANGED, (data: { value: string }) => {
	appData.order.phone = data.value;
});

events.on(Events.ORDER_VALIDATED, (errors: Partial<IFormErrors>) => {
	const { payment, address, email, phone } = errors;
	deliveryForm.valid = !payment && !address;
	contactsForm.valid = !email && !phone;
	deliveryForm.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
	contactsForm.errors = Object.values({ email, phone })
		.filter((i) => !!i)
		.join('; ');
});

events.on(Events.PAYMENT_STEP_COMPLETED, () => {
	events.emit(Events.CONTACTS_STEP_OPENED);
});

events.on(Events.CONTACTS_STEP_OPENED, () => {
	const order = appData.order;
	modal.render({
		content: contactsForm.render({
			email: order.email,
			phone: order.phone,
			valid: false,
			errors: [],
		}),
	});
});

events.on(Events.CONTACTS_STEP_COMPLETED, () => {
	const order = appData.order;

	api
		.postOrderLots(
			{
				payment: order.payment,
				address: order.address,
				email: order.email,
				phone: order.phone,

				total: appData.getTotalAmount(),
				items: appData.getBasketIds(),
			}
		)
		.then((result) => {
			const success = new Success(cloneTemplate(successTemplate), events, {
				onClick: () => {
					modal.close();
				},
			});
			modal.render({
				content: success.render({
					total: result.total,
				}),
			});

			appData.clearBasket();
		})
		.catch((err) => {
			console.error(err);
		});
});

events.on(Events.MODAL_OPENED, () => {
	page.locked = true;
});

events.on(Events.MODAL_CLOSED, () => {
	page.locked = false;
});

api
	.getLotList()
	.then((res) => {
		appData.catalog = res;
	})
	.catch(console.error);
