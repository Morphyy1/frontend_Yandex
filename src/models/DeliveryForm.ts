import { Events, IPayType, IOrderDeliveryForm} from '../types';
import { ensureElement } from '../utils/utils';
import { IEvents } from '../components/base/events';
import { Form } from '../models/Form';

export { DeliveryForm, IOrderDeliveryForm };

class DeliveryForm extends Form<IOrderDeliveryForm> {
	protected _payContainer: HTMLDivElement;
	protected _payButtons: HTMLButtonElement[];

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._payContainer = ensureElement<HTMLDivElement>(
			'.order__buttons',
			this.container
		);
		this._payButtons = Array.from(
			this._payContainer.querySelectorAll('.button_alt')
		);

		this._payContainer.addEventListener('click', (e: MouseEvent) => {
			const target = e.target as HTMLButtonElement;
			this.setMethod(target.name);
			events.emit(Events.PAYMENT_METHOD_CHANGED, { target: target.name });
		});
	}

	setMethod(className: string): void {
		this._payButtons.forEach((btn) => {
			if (btn.name === className) {
				this.toggleClass(btn, 'button_alt-active', true);
			} else {
				this.toggleClass(btn, 'button_alt-active', false);
			}
		});
	}

	set payment(value: string){
		this.setMethod(value);
	}

	set address(value: IPayType) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}
}

