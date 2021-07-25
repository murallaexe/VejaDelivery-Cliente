import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { LandigPageComponent } from './landig-page/landig-page.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SingINComponent } from './sing-in/sing-in.component';
import { AppCustomerComponent } from './app-customer/app-customer.component';
import { HeaderComponent } from './Components/header/header.component';
import { PanelLeftComponent } from './Components/panel-left/panel-left.component';
import { CategoryComponent } from './Components/category/category.component';
import { CompanyComponent } from './Components/company/company.component';
import { ProductCompanyComponent } from './Components/product-company/product-company.component';
import { RegisterComponent } from './Components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LandigPageComponent,
    LoginComponent,
    NotFoundComponent,
    SingINComponent,
    AppCustomerComponent,
    HeaderComponent,
    PanelLeftComponent,
    CategoryComponent,
    CompanyComponent,
    ProductCompanyComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
