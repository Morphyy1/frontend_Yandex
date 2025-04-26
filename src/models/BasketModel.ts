import { IBasketModel, IEventEmitter} from '@/types';

export class BasketModel implements IBasketModel {
  items: Map<string, number> = new Map();
  total: number = 0;

  constructor(private events: IEventEmitter) {}

  add(id: string): void {
    if (!this.items.has(id)) {
      this.items.set(id, 1);
    } else {
      this.items.set(id, this.items.get(id)! + 1);
    }
    this._update();
  }

  remove(id: string): void {
    if (this.items.has(id)) {
      this.items.delete(id);
    }
    this._update();
  }

  clear(): void {
    this.items.clear();
    this._update();
  }

  getTotal(): number {
    return this.total;
  }

  private _update(): void {
    let count = 0;
    this.items.forEach((quantity) => count += quantity);
    this.total = count;
    this.events.emit('basket:changed', this.total);
  }
}
