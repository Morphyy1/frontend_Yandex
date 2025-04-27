import { IOrderContactsForm } from '../models/ContactsForm';
import { IOrderDeliveryForm } from '../models/DeliveryForm';

export {
	ILotCategory,
	ILotItem,
	ILarek,
	ILot,
	IPaymentType,
	IOrderDeliveryForm,
	IOrderForm,
	IFormErrors,
	IOrder,
	IBasketItem,
	IAppState,
	CatalogChangeEvent,
	IOrderAPI,
	Events,
};

enum Events {
	LOAD_LOTS = 'catalog:changed', 
	OPEN_LOT = 'card:open',
	OPEN_BASKET = 'basket:open', 
	CHANGE_LOT_IN_BASKET = 'lot:changed', 
	VALIDATE_ORDER = 'formErrors:changed', 
	OPEN_FIRST_ORDER_PART = 'order_payment:open',
	FINISH_FIRST_ORDER_PART = 'order:submit', 
	OPEN_SECOND_ORDER_PART = 'order_contacts:open', 
	FINISH_SECOND_ORDER_PART = 'contacts:submit', 
	PLACE_ORDER = 'order:post', 
	SELECT_PAYMENT = 'payment:changed', 
	INPUT_ORDER_ADDRESS = 'order.address:change', 
	INPUT_ORDER_EMAIL = 'contacts.email:change', 
	INPUT_ORDER_PHONE = 'contacts.phone:change', 
	OPEN_MODAL = 'modal:open', 
	CLOSE_MODAL = 'modal:close', 
}

type ILotCategory =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';


interface ILotItem {
	id: string; // идентификатор лота
	title: string; // заголовок лота
	description: string; // описание лота
	image: string; // полный путь до файла картинки лота
	category: ILotCategory; // категория лота
	price: number | null; // цена лота
}

interface ILarek {
	isOrdered: boolean; // признак включения в заказ
	placeInBasket: () => void; // добавляем лот в корзину
	removeFromBasket: () => void; // удаляем лот из корзины
}

type ILot = ILotItem & ILarek;
type IPaymentType = 'card' | 'cash'; 
type IOrderForm = IOrderDeliveryForm & IOrderContactsForm;

interface IOrderAPI extends IOrderForm {
	items: string[]; // индексы покупаемых лотов
	total: number; // общая стоимость заказа
}

interface IOrder extends IOrderForm {
	items: ILot[]; 
	validateOrder(): void; 
	clearOrder(): void; 
	validatePayment(): void; 
	validateAddress(): void; 
	validateEmail(): void; 
	validatePhone(): void; 
	postOrder(): void; 
}

type IFormErrors = Partial<Record<keyof IOrderForm, string>>;

type CatalogChangeEvent = {
	catalog: ILot[];
};

type IBasketItem = Pick<ILot, 'id' | 'title' | 'price'>;

interface IAppState {
	catalog: ILot[]; 
	basket: ILot[]; 
	order: IOrder; 
	preview: ILot; 
	isLotInBasket(item: ILot): boolean; 
	clearBasket(): void; 
	getTotalAmount(): number; 
	getBasketIds(): number; 
	getBasketLength(): number; 
	initOrder(): IOrder; 
}

