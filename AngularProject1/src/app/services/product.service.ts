import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getAllProductsCategoryId(urun_marka: number): Observable<Product[]> {
    let apiCategoryId = this.apiUrl + '?urun_marka=' + urun_marka;
    return this.http.get<Product[]>(apiCategoryId);
  }

  addAllProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  getClearProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(this.apiUrl + '/' + product.id);
  }

  getProductDetails(pId: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + '/' + pId);
  }
}
