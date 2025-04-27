import { IOrderForm } from "../order/IOrderForm";

export interface IOrderAPI extends IOrderForm {
	items: string[]; 
	total: number; 
}	