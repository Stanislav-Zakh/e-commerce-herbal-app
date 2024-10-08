import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItem } from "./order-item";

export class PurchaseDTO {

    customer!: Customer;
    order!: Order;
    billingAddress!: Address;
    orderItems!: OrderItem[];
}
