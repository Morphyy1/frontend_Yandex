import { IProduct, ICatalogModel, IEventEmitter } from '@/types';

export class CatalogModel implements ICatalogModel {
  items: IProduct[] = [];

  constructor(private events: IEventEmitter) {}

  setItems(items: IProduct[]) {
    this.items = items;
    this.events.emit('catalog:changed', this.items);
  }

  getProduct(id: string): IProduct {
    const product = this.items.find((item) => item.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  getProducts(ids: string[]): IProduct[] {
    return this.items.filter(item => ids.includes(item.id));
  }
}
