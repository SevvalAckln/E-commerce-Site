import { Product } from 'src/app/models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageSliderService {
  apiUrl = ' http://localhost:3000/products'; //ürünler api
  constructor(private http: HttpClient) {}

  getImages() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.get<Product[]>(this.apiUrl, httpOptions);
  }
}

//NOT => RESİMLER YÜKLENMEDİ
