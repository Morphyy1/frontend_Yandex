export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICard {
	category: string; 
	title: string; 
	image: string; 
	price: number; 
	description: string; 
	button?: string; 
}