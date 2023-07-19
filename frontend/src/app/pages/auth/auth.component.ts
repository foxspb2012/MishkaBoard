import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private userService: UserService) {}
  isTabCaching: boolean = false;

  ngOnInit(): void {
    this.userService.clearData();
    this.userService.clearStore();
  }
}
