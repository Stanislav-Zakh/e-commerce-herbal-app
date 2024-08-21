import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryURL: string = environment.securedLocalURLBase + "api/categories";

  constructor(private client: HttpClient) { 

  }


  getCategories(): Observable<ProductCategory[]> {
  
    return this.client.get<ProductCategory[]>(this.categoryURL); 
  } 
}
