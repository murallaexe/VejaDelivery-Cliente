import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faBars, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() OnOcultarBarra = new EventEmitter();
  ocultar:boolean=false;
  nombreUsuarioHeader:String="";
  ocultarLo:boolean=false;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    
    if(innerWidth<575){
      this.ocultar=false;
      this.OnOcultarBarra.emit(this.ocultar);
      console.log("resolucion pantalla: ",innerWidth);
    }
  }
  faBars=faBars;
  faPowerOff=faPowerOff;
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
  ocultarLogout(){
    if(this.ocultarLo==true){
      this.ocultarLo=false;
    }else{
     this.ocultarLo=true; 
    };
    console.log("ocultar Logout")
  }
  retornarinformacionUsuario(data:any){
    console.log("esta es la data en header.Component : ", data);
  }
  logout(){
    this.authService.logout();
  }
}
