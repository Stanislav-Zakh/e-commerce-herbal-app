export class Order {

    totalCost!: number;

    totalItems!: number;

    constructor(totalPrice: number, totalQuantity: number) {
        this.totalCost = totalPrice;
        this.totalItems = totalQuantity; 
    }

}
