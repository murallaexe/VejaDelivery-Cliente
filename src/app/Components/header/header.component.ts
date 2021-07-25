import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() OnOcultarBarra = new EventEmitter();
  ocultar:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  faBars=faBars;
  ocultarPanelLeft(){
    if(this.ocultar==false){
      this.ocultar = true;
      this.OnOcultarBarra.emit(this.ocultar);
    }else{
      this.ocultar = false;
      this.OnOcultarBarra.emit(this.ocultar);
    }
    // console.log("Ocultar Barra");
    console.log(this.ocultar);
  }
  
}
