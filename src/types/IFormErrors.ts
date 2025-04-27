import { IOrderForm } from "./order/IOrderForm";


export type IFormErrors = Partial<Record<keyof IOrderForm, string>>;