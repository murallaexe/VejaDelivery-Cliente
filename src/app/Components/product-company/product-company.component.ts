import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-company',
  templateUrl: './product-company.component.html',
  styleUrls: ['./product-company.component.css']
})
export class ProductCompanyComponent implements OnInit {
  selectProduct:string="Combos";
  ProductoSelection="Company";
  @Output() onProductoSelection = new EventEmitter();
  constructor() { }
  activarDescs:boolean=true;
  activarConts:boolean=false;
  activarPres:boolean=false;
  ngOnInit(){
    // this.selectProduct="combos";
  }
  activarDesc(){
    this.activarDescs=true;
    this.activarConts=false;
    this.activarPres=false;
  }
  activarCont(){
    this.activarDescs=false;
    this.activarConts=true;
    this.activarPres=false;
  }
  activarPre(){
    this.activarDescs=false;
    this.activarConts=false;
    this.activarPres=true;
  }
  comprar(){
    if(this.selectProduct=="Combos"){
      this.selectProduct="genereOrders";
    }else{
      this.selectProduct="Combos";
    }
    console.log(this.selectProduct);
  }
  selectFatherProduct(evento:any){
    console.log("llegada al product: ",evento);
  }
  irAtras(){
    this.selectProduct="Combos";
  }
  irAtrasW(){
    console.log("entro a ir atras de productos: ",this.ProductoSelection)
    this.onProductoSelection.emit(this.ProductoSelection);
  }
}
