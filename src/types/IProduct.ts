export interface IProduct {
    id: string;
    title: string;
    price: number | null; // null для "бесценных" товаров
    description: string;
    image: string;
    category: string;
}

export interface IProductPreview extends Pick<IProduct, 'id' | 'title' | 'price'> {
    
}