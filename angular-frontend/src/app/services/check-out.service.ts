import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseResponse } from '../common/purchase-response';
import { PurchaseDTO } from '../common/purchase-dto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  private purchaseURL: string = environment.securedLocalURLBase + "api/checkout";

  constructor(private client: HttpClient) { }


  registerPurchase(purchase: PurchaseDTO): Observable<PurchaseResponse>  {

    return this.client.post<PurchaseResponse>(this.purchaseURL, purchase, { withCredentials: true });
  } 



}
