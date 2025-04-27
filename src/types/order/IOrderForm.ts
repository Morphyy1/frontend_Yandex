import { IOrderDeliveryForm } from '../../models/DeliveryForm';
import { IOrderContactsForm } from "../../models/ContactsForm";


export type IOrderForm = IOrderDeliveryForm & IOrderContactsForm;