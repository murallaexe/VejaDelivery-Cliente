import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faSitemap, faCut , faShoppingBag, faIndustry,faGlassCheers, faCar, faCoffee,faHeartbeat,faLaptop,faPlus, faSuitcase,faHandshake, faThList, faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-panel-left',
  templateUrl: './panel-left.component.html',
  styleUrls: ['./panel-left.component.css']
})
export class PanelLeftComponent implements OnInit {
  selectRegister:string="";
  @Output() onSelectRegister = new EventEmitter();
  selectCategory:string="";
  selectCompany:string="";
  constructor() { }
  leftCategory:boolean=true;
  leftRegister:boolean=true;
  ngOnInit(): void {
  }
  
  faSitemap = faSitemap; 
  faCut = faCut;
  faShoppingBag = faShoppingBag; 
  faIndustry =faIndustry;
  faGlassCheers =faGlassCheers;
  faCar = faCar;
  faCoffee = faCoffee;
  faHeartbeat =faHeartbeat;
  faLaptop =faLaptop;
  faPlus =faPlus;
  faSuitcase = faSuitcase;
  faHandshake =faHandshake;
  faThList = faThList;
  faStar = faStar;
  Register(envent:any){
    //console.log("selecciono en resgitro: ",envent);
    if(envent==1){
      this.selectRegister="RegisterCompras";
    }else{
      this.selectRegister="RegisterList";
    };
    var enviar ={
      url:this.selectRegister,
      id: "data",
    }
    this.onSelectRegister.emit(enviar);
  }
  desplegar(envent:any){
    if(envent==1){
      if(this.leftCategory==false){
        this.leftCategory=true;
      }else{
        this.leftCategory=false;
      }
    }else{
      if(this.leftRegister==false){
        this.leftRegister=true;
      }else{
        this.leftRegister=false;
      }
    }
  }
  categoryBarraleft(){
    this.selectCategory="Category";
    var enviar ={
      url:this.selectCategory,
      id: "data",
    }
    //console.log("panel-left components");
    this.onSelectRegister.emit(enviar);
  }
  companyBarraleft(){
    this.selectCategory="Company";
    var enviar ={
      url:this.selectCategory,
      id: "data",
    }
    // console.log("panel-left components");
    this.onSelectRegister.emit(enviar);
  }
  PerfilBarraleft(){
    this.selectCategory="MyPerfil";
    var enviar ={
      url:this.selectCategory,
      id: "data",
    }
    // console.log("panel-left components");
    this.onSelectRegister.emit(enviar);
  }
}
