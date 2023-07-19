import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  userName: string ;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Все объявления',
        routerLink: ['offers-list']
      },
      {
        label: 'Создать объявление',
        routerLink: ['offer-create']
      },
      {
        label: 'Выйти',
        routerLink: ['/auth']
      }
    ];

    this.userName = this.userService.getUser()?.name || 'user';
  }

}
