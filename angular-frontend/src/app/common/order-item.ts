import { CartItem } from "./cart-item";

export class OrderItem {

    productId!: number;
    name!: string;
    unitPrice!: number;
    imageURL!: string;
    quantity!: number;

    constructor(cartItem: CartItem) {
        this.productId = cartItem.id;
        this.name = cartItem.name;
        this.unitPrice = cartItem.unitPrice;
        this.imageURL = cartItem.imageURL;
        this.quantity = cartItem.quantity
    }
}
