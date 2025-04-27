import { IOrderForm} from "./IOrderForm";
import { ILot } from "../lot/ILot";
import { IPayType } from "../IPayType";

export interface IOrder extends IOrderForm {
	items: ILot[]; 
	
	validateOrder(): void; 
	clearOrder(): void; 
	validatePayment(): void; 
	validateAddress(): void; 
	validateEmail(): void; 
	validatePhone(): void; 
	postOrder(): void; 
}

export interface IOrderContactsForm {
	email: string;
	phone: string;
}

export interface IOrderDeliveryForm {
	payment: IPayType; 
	address: string; 
}