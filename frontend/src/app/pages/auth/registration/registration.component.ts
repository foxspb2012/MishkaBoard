import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../../../models/users-interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  firstnameText = "Имя";
  lastnameText = "Фамилия";
  emailText = "Эл. почта";
  pswText = "Пароль";
  pswRepeatText = "Пароль еще раз";

  firstname: string;
  lastname: string;
  email: string;
  psw: string;
  pswRepeat: string;

  constructor(private messageService: MessageService,
              private authService: AuthService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  registration(evt: Event): void | boolean {

    if (this.psw !== this.pswRepeat) {
      this.messageService.add({severity: 'error', summary: 'Введённые пароли не совпадают'});
      return false;
    }

    const userObj: UserInterface = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.psw,
    }

    this.http.post('http://localhost:3333/api/auth/register', userObj).subscribe(() => {

      this.messageService.add({severity: 'success', summary: 'Регистрация прошла успешно'});

    }, ({error}) => {
      console.log(error);
      this.messageService.add({severity: 'warn', summary: error.message});

    });
  }

}
