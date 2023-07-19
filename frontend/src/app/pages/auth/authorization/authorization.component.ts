import { Component, OnInit } from '@angular/core';
import { LoginUserInterface } from '../../../models/users-interface';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit {
  emailText = 'Эл. почта';
  pswText = 'Пароль';
  psw: string;
  id: string;
  name: string;
  email: string;
  authTextButton: string;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private userService: UserService,
              private http: HttpClient) {

  }

  ngOnInit(): void {
    this.authTextButton = "Войти";
  }

  onAuth(evt: Event): void {
    const authUser: LoginUserInterface = {
      id: this.id,
      email: this.email,
      password: this.psw,
      name: this.name
    }

    this.http.post<{
      access_token: string,
      user: {
        id: string,
        name: string
      }
    }>('http://localhost:3333/api/auth/login', authUser).subscribe((data) => {
      authUser.id = data.user.id;
      this.userService.fillData(data.access_token, data.user);
      const token: string = data.access_token;
      this.userService.setToStore(data.access_token, data.user.id);
      this.router.navigate(['offers/offers-list']);

    }, ({error}) => {

      this.messageService.add({severity: 'warn', summary: error.message});

    });
  }
}
