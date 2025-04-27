import { ensureElement, formatSinaps } from '../utils/utils';
import { IEvents } from '../components/base/events';
import { ICardActions } from '../models/CardModel';
import { Component } from '../components/base/Component';
import { IBasketCard } from '../types'

export { BasketItem };


class BasketItem extends Component<IBasketCard> {
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _disableButton: HTMLButtonElement;

	constructor(container: HTMLElement, events: IEvents, actions?: ICardActions) {
		super(container, events);

		this._index = ensureElement<HTMLElement>('.basket__item-index', container);
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);

		this._disableButton = container.querySelector('.card__button');
		this._disableButton.addEventListener('click', (event: MouseEvent) => {
			actions.onClick?.(event);
		}
	);
	}

	set index(value: number) {
		this.setText(this._index, value + 1);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: number) {
		this.setText(this._price, formatSinaps(value));
	}
}

