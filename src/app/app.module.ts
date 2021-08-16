import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations' 
// import { AgmCoreModule } from '@agm/core'

// import { AgmCoreModule } from 'angular2-google-maps/core'

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
import { MyPerfilComponent } from './Components/my-perfil/my-perfil.component';
import {AuthGuard} from './auth.guard';
import { TokenInterceptorService } from './Service/token-interceptor.service';
import { CommonModule } from '@angular/common';
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
    RegisterComponent,
    MyPerfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ClipboardModule,
    BrowserAnimationsModule
    // AgmCoreModule.forRoot(
    //   {apiKey:'AIzaSyD3Jzj8Mbr-yIn7O09KmPbqpuxuUVYxMfE'}
    // )
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
