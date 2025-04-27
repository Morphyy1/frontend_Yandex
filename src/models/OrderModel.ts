import { Events, IFormErrors, ILot, IOrder, IPayType } from '../types';
import { Model } from '../components/base/Model';


export { Order };

class Order extends Model<IOrder> {
	protected _payment: IPayType = 'card';
	protected _address: string = '';
	protected _email: string = '';
	protected _phone: string = '';
	protected _items: ILot[] = [];
	protected _formErrors: IFormErrors = {};

	validateOrder(): void {
		this.validatePayment();
		this.validateAddress();
		this.validateEmail();
		this.validatePhone();

		this.emitChanges(Events.ORDER_VALIDATED, this._formErrors);
	}

	clearOrder(): void {
		this._payment = 'card';
		this._address = '';
		this._email = '';
		this._phone = '';
	}

	set payment(value: IPayType) {
		this._payment = value;
		this.validateOrder();
	}

	get payment() {
		return this._payment;
	}

	validatePayment(): void {
		if (!this._payment) {
			this._formErrors.payment = 'Необходимо выбрать способ оплаты';
		} 
		else {
			this._formErrors.payment = '';
		}
	}

	set address(value: string) {
		this._address = value;
		this.validateOrder();
	}

	get address() {
		return this._address;
	}

	validateAddress(): void {
		if (!this._address) {
			this._formErrors.address = 'Необходимо ввести адрес доставки';
		} else {
			this._formErrors.address = '';
		}
		this.emitChanges(Events.ORDER_VALIDATED, this._formErrors);
	}

	set email(value: string) {
		this._email = value.toLowerCase();
		this.validateOrder();
	}

	get email() {
		return this._email;
	}

	validateEmail(): void {
		if (!this._email) {
			this._formErrors.email = 'Необходимо ввести почту';
		} else {
			this._formErrors.email = '';
		}
		this.emitChanges(Events.ORDER_VALIDATED, this._formErrors);
	}

	set phone(value: string) {
		this._phone = value;
		this.validateOrder();
	}

	get phone() {
		return this._phone;
	}

	validatePhone(): void {
		if (!this._phone) {
			this._formErrors.phone = 'Необходимо ввести телефон';
		} else {
			this._formErrors.phone = '';
		}
		this.emitChanges(Events.ORDER_VALIDATED, this._formErrors);
	}

	set items(value: ILot[]) {
		this._items = value;
	}

	get items() {
		return this._items;
	}

	postOrder(): void {
		this.clearOrder();
		this.emitChanges(Events.ORDER_SUBMITTED);
	}
}

