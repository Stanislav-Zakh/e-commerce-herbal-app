import { Component } from '@angular/core';
import { CartItemService } from '../../services/cart-item.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent {

  totalQuantity: number = 0;
  totalPrice: number = 0; 

  constructor(private cartService: CartItemService) {

  }

  ngOnInit(): void {
    this.cartService.totalPrice.subscribe(price => this.totalPrice = price);
    this.cartService.totalQuantity.subscribe(quantity => this.totalQuantity = quantity);
  }

}
