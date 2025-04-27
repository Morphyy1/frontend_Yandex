import { Events } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from '../components/base/Component';
import { IEvents } from '../components/base/events';

export { Modal };

interface IModalData {
	content: HTMLElement;
}

class Modal extends Component<IModalData> {
	private _closeButton: HTMLButtonElement;
	private _content: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);

		this._content = ensureElement<HTMLElement>('.modal__content', container);

		[this._closeButton, this.container].forEach((element) => {
			element.addEventListener('click', () => {
				this.close();
				this.events.emit(Events.MODAL_CLOSED);
			});
		});

		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open(): void {
		this.toggleClass(this.container, 'modal_active', true);
		this.events.emit(Events.MODAL_OPENED);
	}

	close(): void {
		this.toggleClass(this.container, 'modal_active', false);
		this.content = null;
		this.events.emit(Events.MODAL_CLOSED);
	}

	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();

		return this.container;
	}
}

