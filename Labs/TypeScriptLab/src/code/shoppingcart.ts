import {OrderDetail} from './orderdetail';
import {Product} from './product';

export namespace ToyStore {
    export class ShoppingCart {
        constructor(public items: Array<OrderDetail> = []) {}

        public addItem(item: OrderDetail): number;
        public addItem(product: Product, quantity: number): number;

        public addItem(itemOrProduct: any, quantity?: number): number {
            let item: OrderDetail;

            if(itemOrProduct instanceof OrderDetail) {
                item = itemOrProduct;
            } else {
                item = new OrderDetail(itemOrProduct, quantity);
            }

            return this.items.push(item);
        }
    }
}