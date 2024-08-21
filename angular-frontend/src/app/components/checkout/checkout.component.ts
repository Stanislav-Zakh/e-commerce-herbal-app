import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartItemService } from '../../services/cart-item.service';
import { CommonModule } from '@angular/common';
import { CheckOutService } from '../../services/check-out.service';
import { PurchaseDTO } from '../../common/purchase-dto';
import { Order } from '../../common/order';
import { OrderItem } from '../../common/order-item';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  totalQuantity!: number;
  totalPrice!: number;

  checkoutForm!: FormGroup; 

  constructor(private itemService: CartItemService, private builder: FormBuilder, 
              private checkoutService: CheckOutService) {

  } 

    ngOnInit() {

      this.itemService.totalQuantity.subscribe(quantity => this.totalQuantity = quantity);
      this.itemService.totalPrice.subscribe(price => this.totalPrice = price);

      this.checkoutForm = this.builder.group({
            customer: this.builder.group({
              firstName: new FormControl('testName', [Validators.required, Validators.minLength(2), ]),
              lastName: new FormControl('testLastName', [Validators.required, Validators.minLength(2)]),
              email: new FormControl('testmail@gmail.com', [Validators.required, Validators.pattern("^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$")])
            }),
            billingAddress: this.builder.group({
              street: new FormControl('testStreet', [Validators.required, Validators.minLength(2)]),
              city: new FormControl('testCity', [Validators.required, Validators.minLength(2)]),
              state: new FormControl('', Validators.required),
              country: new FormControl('', Validators.required),
              zipCode: new FormControl('testZip', [Validators.required, Validators.minLength(2)])
            }),
            creditCard: this.builder.group({
              cardType: new FormControl('', Validators.required),
              nameOnCard: new FormControl('testName', [Validators.required, Validators.minLength(2)]),
              cardNumber: new FormControl('1234567891234567', [Validators.required, Validators.pattern("[0-9]{16}")]),
              securityCode: new FormControl('123', [Validators.required, Validators.pattern("[0-9]{3}")]),
              expirationMonth: new FormControl('', Validators.required),
              expirationYear: new FormControl('', Validators.required)
            })
          });
    } 

    get firstName() { return this.checkoutForm.get("customer.firstName")!;}
    get lastName() { return this.checkoutForm.get("customer.lastName");}
    get email() { return this.checkoutForm.get("customer.email");}
    get billingStreet() { return this.checkoutForm.get("billingAddress.street");}
    get billingCity() { return this.checkoutForm.get("billingAddress.city");}
    get billingState() { return this.checkoutForm.get("billingAddress.state");}
    get billingCountry() { return this.checkoutForm.get("billingAddress.country");}
    get zipCode() { return this.checkoutForm.get("billingAddress.zipCode");}
    get cardType() { return this.checkoutForm.get("creditCard.cardType");}
    get nameOnCard() { return this.checkoutForm.get("creditCard.nameOnCard");}
    get cardNumber() { return this.checkoutForm.get("creditCard.cardNumber");}
    get securityCode() { return this.checkoutForm.get("creditCard.securityCode");}
    get expirationMonth() {return this.checkoutForm.get("creditCard.expirationMonth");}
    get expirationYear() {return this.checkoutForm.get("creditCard.expirationYear")}


    submitPurchase(): void {

      if (this.checkoutForm.invalid) {
        this.checkoutForm.markAllAsTouched();
        return;
      }

      var purchase: PurchaseDTO =  new PurchaseDTO();

      purchase.customer = this.checkoutForm.get("customer")?.value;
      
      purchase.order = new Order(this.totalPrice, this.totalQuantity);

      purchase.orderItems = this.itemService.cartItemList.map( item => new OrderItem(item));

      purchase.billingAddress = this.checkoutForm.get("billingAddress")!.value;

      this.checkoutService.registerPurchase(purchase).subscribe(
        {
          next: (response) => { 
            alert("Your purchase was successful, your purchase tracking number: " +  response.uid);
            this.checkoutForm.reset(); // <- Included form reset/clear
            this.itemService.cartItemList = [];
          },
          error: (e) => alert("Failed tp process your purchase." + e)
      }) 
    }





}
