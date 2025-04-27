import { Component } from '../components/base/Component';
import { EventEmitter } from '../components/base/events';
import { Events, IBasketView } from '../types';
import { createElement, ensureElement, formatSinaps } from '../utils/utils';


export { Basket };

class Basket extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(container: HTMLElement, events: EventEmitter) {
		super(container, events);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit(Events.PAYMENT_STEP_OPENED);
			});
		}
		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	set total(total: number) {
		this.setText(this._total, formatSinaps(total));
	}

	set validation(value: boolean){
		this.setDisabled(this._button, !value);
	}
}

