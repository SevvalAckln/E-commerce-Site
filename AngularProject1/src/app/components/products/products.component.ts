import { Product } from 'src/app/models/product';
import { CardService } from './../../services/card.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  totalLength: any;
  page: number = 1;
  pageNumber: number = 10;
  filterText = '';

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['urun_marka']) {
        this.getProductsCategoryId(params['urun_marka']); //Kategori ıd'sine göre ürünlerin listelenmesi gerçekleştiriliyor.
      } else {
        this.getProducts();
        this.totalLength = params.length;
      }
    });
  }

  //Ürünlere ulaşacağımız fonksiyon
  getProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.products.forEach((a) => {
        Object.assign(a, { quantity: 1, total: a.urun_fiyat }); //Sepette gösterilecek adet ve toplam fiyat
      });
    });
  }
  getProductsCategoryId(urun_marka: number) {
    this.productService
      .getAllProductsCategoryId(urun_marka)
      .subscribe((data) => {
        this.products = data; //Kaategori numarası uyan ürünleri eşleştiriyoruz
      });
  }
  inc() {
    if (this.pageNumber < this.products.length) {
      this.pageNumber = this.pageNumber + 15; //Daha fazla sayfa göstermek için
    }
  }

  des() {
    if (this.pageNumber > 1) {
      this.pageNumber = this.pageNumber - 5; // Daha az sayfa göstermek için
    }
  }

  clearCard(p: Product) {
    this.productService.getClearProduct(p).subscribe((a) => {
      let index = this.products.indexOf(p);
      this.products.splice(index, 1);
      this.toastrService.error('Ürün sistemden kaldırılmıştır.');
    });
  }

  addToCard(p: Product) {
    this.cardService.addToCard(p);
    this.toastrService.success('Ürün sepete eklenmiştir.');
  }
}
