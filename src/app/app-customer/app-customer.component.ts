import { Component, OnInit, ViewChild,Injector, AfterViewInit, ViewChildren, AfterViewChecked, } from '@angular/core';
import { CategoryComponent } from '../Components/category/category.component';
import { CompanyComponent } from '../Components/company/company.component';
import { HeaderComponent } from '../Components/header/header.component';
import { MyPerfilComponent } from '../Components/my-perfil/my-perfil.component';
import { ProductCompanyComponent } from '../Components/product-company/product-company.component';
import { RegisterComponent } from '../Components/register/register.component';
import { AuthService } from '../Service/auth.service';
import { CustomerService } from '../Service/customer.service';

@Component({
  selector: 'app-app-customer',
  templateUrl: './app-customer.component.html',
  styleUrls: ['./app-customer.component.css'],
})

export class AppCustomerComponent implements OnInit,AfterViewInit, AfterViewChecked{
  @ViewChild('Product') productCompany!: ProductCompanyComponent;
  @ViewChild('regiter') registerComponent!: RegisterComponent;
  @ViewChild('header') headerComponent!:HeaderComponent;
  @ViewChild('Myperfils') myPerfilComponent!:MyPerfilComponent;
  @ViewChild("company") public companyComponent !: CompanyComponent;
  @ViewChild('category') categoryComponent!:CategoryComponent;
  panelLeft:boolean= false;
  nada:String=""


  // ocultarfalse:boolean=false;
  // ocultartrue:boolean=true;
  constructor(
    private authService:AuthService,
  ){}
  ngAfterViewInit():void{
  }
  ngAfterViewChecked():void{
  }

  contador:number=0;
  NombreUsuarioBienvenida:String="";
  usuarioLogin:any;
  ocultarMotorista:boolean=true;
  ocultarPanelLeft:boolean=true;
  categoryVisual:boolean=true;
  companyVisual:boolean=false;
  idUsuario:any;
  stadeComponents:string="Category";
  stadePage:String="login";
  ngOnInit(): void {
    //console.log("usuario Login:" , this.usuarioLogin);
    var tokens = localStorage.getItem('token');
    var token = {"token":tokens};
    console.log(token)
    this.authService.authe(token).subscribe(
      res=>{
        console.log(res);
        //para el nombre
        this.headerComponent.nombreUsuarioHeader=res.authData.data.nombreUsuario;
        var cadena = res.authData.data.nombreUsuario.split(" ");
        this.NombreUsuarioBienvenida=cadena[0];
        this.idUsuario=res.authData.data._id;
        this.productCompany.idUsuario=res.authData.data._id;
        if(res.authData.data.tipoUsuario=="motorista"){
          this.ocultarMotorista=true;
        }else{
          this.ocultarMotorista=false;
        }
      },
      error=>{
        console.log(error);
        localStorage.removeItem('token');
        location.reload();
      }
    );
    //this.companyComponent.ocultardatas= false;
  }
  ocultarBarraleft(evento:any){
    //console.log("estado barra", evento);
    this.ocultarPanelLeft=evento;
  }
  // estadoComponentVisualcategory(data:any){
  //   console.log("id category cusmoter",data);
  //   this.companyComponent.recibirDataIdUsuario(data, true);
  // }






  public estadoComponentVisual(evento:any){
    console.log("Estado del los componentes", evento);
    this.stadeComponents=evento.url;
    if(evento.url=="Category"){
      //console.log("url y idUsuario Appcustomer", evento.url,this.idUsuario);
      this.companyComponent.ocultardatas=false;
      this.categoryComponent.ocultardatas=true;
      this.registerComponent.ocultardatas=false;
      this.myPerfilComponent.ocultardatas=false;
      this.productCompany.ocultardatas=false;
    }
    if(evento.url=="Company"){
      //console.log("url y idUsuario Appcustomer", evento.url,this.idUsuario);
      this.companyComponent.recibirDataIdUsuario(evento.id,true);
      this.categoryComponent.ocultardatas=false;
      this.productCompany.ocultardatas=false;
      this.registerComponent.ocultardatas=false;
      this.myPerfilComponent.ocultardatas=false;
    }
    if(evento.url=="CompanyAtras"){
      this.categoryComponent.ocultardatas=true;
      this.companyComponent.ocultardatas=false;
      this.productCompany.ocultardatas=false;
      this.registerComponent.ocultardatas=false;
    }
    if(this.stadeComponents=="productCompany"){
      //console.log("entro a customer", evento);
      this.productCompany.selectFatherProduct(evento,true);
      this.companyComponent.ocultarData(false);
      this.registerComponent.ocultardatas=false;
      this.myPerfilComponent.ocultardatas=false;
    };
    if(evento.url=="MyPerfil"){
      //console.log("Estado del los componentes", evento.url,this.idUsuario);
      this.categoryComponent.ocultardatas=false;
      this.companyComponent.ocultardatas=false;
      this.productCompany.ocultardatas=false;
      this.myPerfilComponent.ocultardatas=true;
      this.myPerfilComponent.informacionUser(this.idUsuario);
      this.registerComponent.ocultardatas=false;
    }
    if(this.stadeComponents=="RegisterCompras"||this.stadeComponents=="RegisterList"){
      // console.log("entro a customer", evento.url);
      this.categoryComponent.ocultardatas=false;
      this.companyComponent.ocultardatas=false;
      this.productCompany.ocultardatas=false;
      this.myPerfilComponent.ocultardatas=false;
      this.registerComponent.selectRegiterFather(evento.url,true,this.idUsuario);
    };
  }
  recibirUsuarioLogin(data:any){
    //console.log(data)
    this.usuarioLogin= data;
  }
  recibirdataLogin(data:any){
      //console.log("app customer: ", data);
      this.stadePage="app";
      this.headerComponent.retornarinformacionUsuario(data);
  }
  guardarCambios(){
    
  }
}
