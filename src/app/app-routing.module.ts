import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule,Router, ActivatedRoute, ParamMap } from '@angular/router'; // CLI imports router


import { LandigPageComponent } from './landig-page/landig-page.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SingINComponent } from './sing-in/sing-in.component';
import { AppCustomerComponent } from './app-customer/app-customer.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: '', component: LandigPageComponent},
    { path: 'https://ncrtrucking.com/VejaDelivery', component: LandigPageComponent,pathMatch:'full'},
    { path: 'https://ncrtrucking.com/VejaDelivery/Login', component: LoginComponent},
    { path: 'https://ncrtrucking.com/VejaDelivery/SingIn', component: SingINComponent},
    { path: 'https://ncrtrucking.com/VejaDelivery/AppCustomer', component: AppCustomerComponent,canActivate:[AuthGuard]},
    { path: '**', component: NotFoundComponent }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
