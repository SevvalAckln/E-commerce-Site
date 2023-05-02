import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  public categories: Category[] = [];
  public activeCategory: Category;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    //Kategorilerin alınması
    this.categoryService.getAllCategory().subscribe((data) => {
      this.categories = data;
    });
  }

  activeClassCategory(c: Category) {
    //Kategorilerin listelenmesi
    if (c == this.activeCategory) {
      //Eğer kategorilerden birine tıklandıysa o sarı renkle gösterilir.
      return 'list-group-item list-group-item-action bg-warning text-white';
    } else {
      return 'list-group-item';
    }
  }

  activeTiklaCategory(c: Category) {
    //Kategori butonuna tıklayınca aktive edilir.
    this.activeCategory = c;
  }
}
