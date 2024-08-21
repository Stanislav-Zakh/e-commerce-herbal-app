import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../common/product';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  private storage: Storage = localStorage;

  cartItemList: CartItem[] = []; 
  totalPrice: Subject<number> =  new BehaviorSubject(0);
  totalQuantity: Subject<number> =  new BehaviorSubject(0);

  constructor() {
    this.loadData();
  }

  incrementQuantity(cartItem: CartItem): void {
    cartItem.quantity++;
    this.countTotal();
  }

  decrementQuantity(cartItem: CartItem): void {
    if (cartItem.quantity > 0) {
        cartItem.quantity--;}
    this.countTotal();
  }

  removeItem(cartItem: CartItem): void {
    this.cartItemList.splice( 
    this.cartItemList.findIndex(item => item.id === cartItem.id) 
    ,1);
    this.countTotal();
  }

  addProduct(product: Product): void {

    var result: CartItem | undefined = this.cartItemList.find(cartItem => cartItem.id === product.id);
    if (result != undefined) {
      result.quantity++;
    } else {
      this.cartItemList.push(new CartItem(product));
    }

    this.countTotal()

  }

  private countTotal() {

    var totalPrice: number = 0;
    var totalQuantity: number = 0;

    for (let item of this.cartItemList) {
      totalPrice += item.unitPrice * item.quantity;
      totalQuantity += item.quantity;
    }

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);

    this.persistData();
  }

  loadData() {
      var items = this.cartItemList = JSON.parse(this.storage.getItem("items")!);
      if (items != null) {
        this.cartItemList = items;
        this.countTotal();
      }
    
  }

  persistData() {
    this.storage.setItem("items", JSON.stringify(this.cartItemList));
  }



}
