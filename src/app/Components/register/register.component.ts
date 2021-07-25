import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectRegister:string="";
  constructor() { }

  ngOnInit(): void {
  }
  
  selectRegiterFather(evento:any){
    console.log("Registro en la clase registerComponert: ",this.selectRegister);
    this.selectRegister=evento;
  }
}
