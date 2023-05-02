import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { CardService } from './../../services/card.service';
import { ActivatedRoute } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productAddForm: FormGroup;
  ProductMdl: Product[];
  categories: Category[] = [];
  urun_marka: ''; //Seçiniz bölümü çıksın diye
  public products: Product[] = [];
  totalLength: any;
  page: number = 1; // Sayfa sayısını tutmak için
  pageNumber: number = 3;
  filterText = '';
  cardService: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createProductAddForm();
    this.getByCategoryId();
  }

  //Ürünlerin formu
  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      urun_marka: ['', Validators.required],
    });
    this.activatedRoute.params.subscribe((params) => {
      if (params['urun_marka']) {
        this.getProductsCategoryId(params['urun_marka']); //Ürünleri kategori numaralarına göre alıyoruz
      } else {
        this.getProducts(); //Ürünleri alıyoruz
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

  addProduct() {
    if (this.productAddForm.valid) {
      let ProductMdl = Object.assign({}, this.productAddForm.value);
      this.productService.addAllProduct(ProductMdl).subscribe(
        (data) => {
          this.toastrService.success('Ürün sisteme eklenmiştir.');
          this.router.navigate(['/products']); //Ürün eklendikten sonra seni tüm ürünlerin listelendiği sayfaya yönlendirir.
          console.log(data);
        },
        (err) => {
          console.log(err.error.message); //Bir hata meydana geldiğinde ise error mesajı iletilir.
        }
      );
    } else {
      this.toastrService.error('Eksik bilgi girdiniz.');
    }
  }

  getByCategoryId() {
    //Kategorilere ulaşacağımız kısım
    this.categoryService.getAllCategory().subscribe((data) => {
      this.categories = data;
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
      this.pageNumber = this.pageNumber + 2; //Daha fazla sayfa göstermek için
    }
  }

  des() {
    if (this.pageNumber > 1) {
      this.pageNumber = this.pageNumber - 2; // Daha az sayfa göstermek için
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
