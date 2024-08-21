import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductTableService {

  private productUrl: string = environment.securedLocalURLBase + "api/products";
  private paginationByCategoryURL: string = this.productUrl + "/search/byCategory/withPagination/"; 
  private paginationByKeyWordURL: string = this.productUrl + "/search/byKeyword/withPagination/"; 

  constructor(private client: HttpClient) { 

  }

  getProducts(): Observable<Product[]> {
    return this.client.get<Product[]>(this.productUrl);
  } 

  getProductById(id: number): Observable<Product> {
    return this.client.get<Product>(`${this.productUrl}/${id}`);
  } 

  getProductsByCategoryId(category_id: number): Observable<Product[]> {
    return this.client.get<Product[]>(`${this.productUrl}/search/byCategory/${category_id}`);
  } 

  getProductsByCategoryIdWithPagination(category_id: number, page: number, size: number): Observable<PaginatedResponse<Product>> {
    const params = new HttpParams().set("page", page).set("size", size);
    return this.client.get<PaginatedResponse<Product>>(`${this.paginationByCategoryURL}${category_id}`,{params});
  }

  getProductsByKeyword(keyword: string): Observable<Product[]> {
    return this.client.get<Product[]>(`${this.productUrl}/search/byKeyword/${keyword}`);
  }

  getProductsByKeywordWithPagination(keyword: string, page: number, size: number): Observable<PaginatedResponse<Product>>{
    const params: HttpParams = new HttpParams().set("page", page).set("size", size); 
    return this.client.get<PaginatedResponse<Product>>(`${this.paginationByKeyWordURL}${keyword}`, {params});
  }
  
}

export interface PaginatedResponse<T> {
  _embedded: { [key: string]: T[] };
  page: Page;
}

export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}
