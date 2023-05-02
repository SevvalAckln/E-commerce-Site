import { ToastrService } from 'ngx-toastr';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  public products: Product[] = [];
  public grandTotal: number; //Toplam fiyatı bulmak için kullanacağız
  constructor(
    private cardService: CardService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.cardService.getProducts().subscribe((data) => {
      this.products = data;
      this.grandTotal = this.cardService.getTotalPrice(); // Ürünlerin toplam fiyatı hesaplanacak
    });
  }

  removeItem(p: Product) {
    //Ürün silinecek
    this.cardService.removeCardItem(p);
    this.toastrService.error('Ürün silindi.');
  }

  removeAllCard() {
    //Tüm ürünler silinecek
    this.cardService.removeAllCard();
    this.toastrService.error('Tüm ürünler silindi.');
  }
}
