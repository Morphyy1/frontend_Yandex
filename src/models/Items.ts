import { Events, ILot, ILotCategory } from '../types';
import { Model } from '../components/base/Model';


class LotItem extends Model<ILot> {
	id: string;
	title: string;
	description: string;
	image: string;
	category: ILotCategory;
	price: number;
	isOrdered: boolean;

	placeInBasket(): void {
		this.isOrdered = true;
		this.emitChanges(Events.LOT_IN_BASKET_UPDATED, { isOrdered: this.isOrdered });
	}

	removeFromBasket() {
		this.isOrdered = false;
		this.emitChanges(Events.LOT_IN_BASKET_UPDATED, { isOrdered: this.isOrdered });
	}
}

export { LotItem };
