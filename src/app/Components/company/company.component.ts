import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {faMapMarker } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companySelection:string="productCompany";
  @Output() onSelectCompany = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  faMapMarked=faMapMarker;
  SelectCompany(){
    console.log()
    this.onSelectCompany.emit(this.companySelection);
  }
  irAtras(){
    this.companySelection="Category";
    this.onSelectCompany.emit(this.companySelection);
  }
}
