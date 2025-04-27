import { ILot } from "./lot/ILot";
import { IOrder } from "./order/IOrder";


export interface IAppState {
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