import { Component, OnInit } from '@angular/core';
import {faMapMarker } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  faMapMarked=faMapMarker;
}
