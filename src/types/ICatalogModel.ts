import { IProduct } from "@/types";

export interface ICatalogModel {
    items: IProduct[];
    setItems(items: IProduct[]): void;
    getProduct(id: string): IProduct | undefined;
    getProducts(ids: string[]): IProduct[];
}

