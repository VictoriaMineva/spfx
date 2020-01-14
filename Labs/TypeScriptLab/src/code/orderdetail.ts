import { Product } from "./product";

export class OrderDetail {
    constructor(public product: Product, public quantity: number) {
        
    }
}