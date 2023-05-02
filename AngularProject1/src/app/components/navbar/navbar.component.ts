import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public totalItem: number = 0; //İlk baştaki ürün sayısı
  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.getProducts().subscribe((data) => {
      this.totalItem = data.length; //Sepete eklenen ürünlerin sayısı
    });
  }
}
