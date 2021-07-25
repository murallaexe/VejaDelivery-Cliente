import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-company',
  templateUrl: './product-company.component.html',
  styleUrls: ['./product-company.component.css']
})
export class ProductCompanyComponent implements OnInit {

  constructor() { }
  activarDescs:boolean=true;
  activarConts:boolean=false;
  activarPres:boolean=false;
  ngOnInit(): void {
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
}
