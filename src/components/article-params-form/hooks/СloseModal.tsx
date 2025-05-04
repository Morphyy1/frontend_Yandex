import { useEffect } from 'react';

export type CloseModalType = {
	isOpen: boolean;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const CloseModal = ({ isOpen, onClose, rootRef }: CloseModalType) => {
	useEffect(() => {
		// По клику за пределами модалки
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
			}
		};
		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, onClose]);
};
