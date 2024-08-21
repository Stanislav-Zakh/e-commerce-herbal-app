import { Product } from "./product";

export class CartItem {
    id: number;
    name: string;
    unitPrice: number;
    imageURL: string;
    quantity: number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.unitPrice = product.unitPrice;
        this.imageURL = product.imageURL;
        this.quantity = 1;
    }

}
