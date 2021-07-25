import { Component, ViewChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DeliveryApp';

  //@ViewChild('header') headerComponent!:HeaderComponent

  
}