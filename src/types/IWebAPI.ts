import { IOrderAPI } from './order/IOrderAPI'
import { ILot } from './lot/ILot'
import { IOrderResult } from './order/IOrderResult'

export interface IWebAPI {
    getLotItem: (id: string) => Promise<ILot>;
    getLotList: () => Promise<ILot[]>;
    postOrderLots: (order: IOrderAPI) => Promise<IOrderResult>;
}