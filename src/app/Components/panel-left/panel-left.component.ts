import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faSitemap, faShoppingBag, faPlus, faHome, faThList, faStar, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { CategoriasService } from 'src/app/Service/categorias.service';

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
  categoryArray:any;
  constructor(
    private categoriasService:CategoriasService
  ){}
  leftCategory:boolean=true;
  leftRegister:boolean=true;
  ngOnInit(): void {
    this.categoriasService.ObtenerCategorias().subscribe(
      res=>{
        //console.log(res);
        this.categoryArray=res;
      },
      error=>console.log(error)
    )
  }
  
  faSitemap = faSitemap; 
  faShoppingBag = faShoppingBag; 
  faPlus =faPlus;
  faHome = faHome;
  faUserCircle =faUserCircle;
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
  categoryBarraleft(idcategoria:any){
    this.selectCategory="Company";
    var enviar ={
      url:this.selectCategory,
      id: idcategoria,
    }
    //console.log("panel-left components");
    this.onSelectRegister.emit(enviar);
  }
  companyBarraleft(){
    this.selectCategory="Category";
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
