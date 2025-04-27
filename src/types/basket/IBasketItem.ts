import { ILot } from "../lot/ILot";

export type IBasketItem = Pick<ILot, 'id'|'price'|'title'>;