import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Все объявления',
        routerLink: ['offers-list']
      },
      {
        label: 'Выйти',
        routerLink: ['/auth']
      }
    ];
  }

}
