import { Component, OnInit } from '@angular/core';
import { LoginUserInterface } from '../../../models/users-interface';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit {
  emailText = 'Эл. почта';
  pswText = 'Пароль';
  psw: string;
  firstname: string;
  lastname: string;
  email: string;
  authTextButton: string;

  constructor(private authService: AuthService,
              private router: Router,
              private http: HttpClient) {

  }

  ngOnInit(): void {
    this.authTextButton = "Войти";
  }

  onAuth(evt: Event): void {
    const authUser: LoginUserInterface = {
      email: this.email,
      password: this.psw,
    }


    this.http.post<{
      access_token: string,
      id: string
    }>('http://localhost:3333/api/auth/login', authUser).subscribe((data) => {
      // authUser.id = data.id;
      // this.userService.setUser(authUser);
      // const token: string = data.access_token;
      // this.userService.setToken(token);
      // this.userService.setToStore(token);

      this.router.navigate(['tickets/tickets-list']);

    }, () => {
      // this.messageService.add({severity: 'warn', summary: "Ошибка"});
    });
  }
}
