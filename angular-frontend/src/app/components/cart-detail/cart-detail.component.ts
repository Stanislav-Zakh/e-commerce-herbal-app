import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartItemService } from '../../services/cart-item.service';
import { CartItem } from '../../common/cart-item';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.css'
})
export class CartDetailComponent {


  cartItemList: CartItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0; 

  constructor(private cartService: CartItemService) {

  } 


  ngOnInit(): void {
    this.cartItemList = this.cartService.cartItemList;
    this.cartService.totalPrice.subscribe(price => this.totalPrice = price);
    this.cartService.totalQuantity.subscribe(quantity => this.totalQuantity = quantity);
  }

  incrementItem(cartItem: CartItem) {
     this.cartService.incrementQuantity(cartItem);
    }

  decrementItem(cartItem: CartItem) {
    this.cartService.decrementQuantity(cartItem);
    }
    
  removeItem(cartItem: CartItem) {
    this.cartService.removeItem(cartItem);
  } 








}
