import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../Components/header/header.component';
import { ProductCompanyComponent } from '../Components/product-company/product-company.component';
import { RegisterComponent } from '../Components/register/register.component';

@Component({
  selector: 'app-app-customer',
  templateUrl: './app-customer.component.html',
  styleUrls: ['./app-customer.component.css']
})

export class AppCustomerComponent implements OnInit {
  @ViewChild('Product') productCompany!: ProductCompanyComponent;
  @ViewChild('regiter') registerComponent!: RegisterComponent;

  panelLeft:boolean= false;
  constructor() { }
  ocultarPanelLeft:boolean=true;
  categoryVisual:boolean=true;
  companyVisual:boolean=false;
  stadeComponents:string="Category";
  ngOnInit(): void {
  }
  ocultarBarraleft(evento:any){
    console.log("estado barra", evento);
    this.ocultarPanelLeft=evento;
  }
  estadoComponentVisual(evento:any){
    //console.log("Estado del los componentes", evento);
    this.stadeComponents=evento;
    if(this.stadeComponents=="productCompany"){
      console.log("entro a customer");
      //this.productCompany.selectFatherProduct(evento);
    };
    if(this.stadeComponents=="RegisterCompras"||this.stadeComponents=="RegisterList"){
      // console.log("entro a customer", evento);
      this.registerComponent.selectRegiterFather(evento);
    };
  }
}
