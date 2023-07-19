import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestInterceptorsService } from './services/interceptors/rest-interceptors.service';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: RestInterceptorsService, multi: true}],
  bootstrap: [AppComponent]
})

export class AppModule {
}
