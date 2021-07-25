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
  @Output() onSelectCategory = new EventEmitter();
  selectCompany:string="";
  @Output() onSelectCompany = new EventEmitter();
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
    console.log("selecciono en resgitro: ",envent);
    if(envent==1){
      this.selectRegister="RegisterCompras";
    }else{
      this.selectRegister="RegisterList";
    }
    this.onSelectRegister.emit(this.selectRegister);
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
    this.onSelectRegister.emit(this.selectCategory);
  }
  companyBarraleft(){
    this.selectCategory="Company";
    this.onSelectRegister.emit(this.selectCategory);
  }
}
