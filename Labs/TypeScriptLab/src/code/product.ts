export class Product {
    constructor(public id: number, public name: string, public price: number, public description: string) {

    }

    get priceInclVAT() {
        return this.price*1.21;
    }
}