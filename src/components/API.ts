import { Api, ApiListResponse } from './base/api';
import { ILot, IOrderAPI, IWebAPI, IOrderResult} from '../types';


export { WebAPI };

class WebAPI extends Api implements IWebAPI {
	private readonly cdn: string;
	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}


	getLotItem(id: string): Promise<ILot> {
		return this.get(`/product/${id}`).then((item: ILot) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	getLotList(): Promise<ILot[]> {
		return this.get('/product/').then((data: ApiListResponse<ILot>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	postOrderLots(order: IOrderAPI): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}

