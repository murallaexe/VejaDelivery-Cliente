import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../Components/header/header.component';

@Component({
  selector: 'app-app-customer',
  templateUrl: './app-customer.component.html',
  styleUrls: ['./app-customer.component.css']
})

export class AppCustomerComponent implements OnInit {
  panelLeft:boolean= false;
  constructor() { }
  ocultarPanelLeft:boolean=true;
  ngOnInit(): void {
  }
  ocultarBarraleft(evento:any){
    console.log("estado barra", evento);
    this.ocultarPanelLeft=evento;
  }
}
