import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  public cardItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  constructor() {}
  getProducts() {
    return this.productList.asObservable();
  }

  addToCard(product: any) {
    this.cardItemList.push(product);
    this.productList.next(this.cardItemList); //Sepete yeni bir ürün eklenir ve toplam fiyat güncellenir.
    this.getTotalPrice();
    console.log(this.cardItemList);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cardItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal; //Sepetteki ürünlerin toplam fiyatları hesaplanıp geri döndürülür
  }
  removeCardItem(product: any) {
    this.cardItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        //Sepetten bir ürün silinebilir
        this.cardItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cardItemList); //Sepetten ürün silindikten sonra sepet sıfırlanmalıdır.
  }

  removeAllCard() {
    this.cardItemList = [];
    this.productList.next(this.cardItemList); //Tüm ürünler sepetten silinebilir
  }
}
