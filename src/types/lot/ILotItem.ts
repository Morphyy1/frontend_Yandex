import { ILotCategory } from "../lot/ILotCategory";


export interface ILotItem {
    id: string; 
    title: string; 
    description: string;
    image: string; 
    category: ILotCategory; 
    price: number | null; 
}

