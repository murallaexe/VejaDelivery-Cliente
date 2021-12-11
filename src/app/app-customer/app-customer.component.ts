import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, OnInit, ViewChild,Injector, AfterViewInit, ViewChildren, AfterViewChecked, } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';

import { CategoryComponent } from '../Components/category/category.component';
import { CompanyComponent } from '../Components/company/company.component';
import { HeaderComponent } from '../Components/header/header.component';
import { MyPerfilComponent } from '../Components/my-perfil/my-perfil.component';
import { ProductCompanyComponent } from '../Components/product-company/product-company.component';
import { RegisterComponent } from '../Components/register/register.component';
import { AuthService } from '../Service/auth.service';
import { CustomerService } from '../Service/customer.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FooternavComponent } from '../Components/footernav/footernav.component';
import { CarritoComponent } from '../Components/carrito/carrito.component';
import { CartShoppingComponent } from '../Components/cart-shopping/cart-shopping.component';

@Component({
  selector: 'app-app-customer',
  templateUrl: './app-customer.component.html',
  styleUrls: ['./app-customer.component.css'],
})

export class AppCustomerComponent implements OnInit{
  @ViewChild('Product') productCompany!: ProductCompanyComponent;
  @ViewChild('regiter') registerComponent!: RegisterComponent;
  @ViewChild('header') headerComponent!:HeaderComponent;
  @ViewChild('Myperfils') myPerfilComponent!:MyPerfilComponent;
  @ViewChild("company") public companyComponent !: CompanyComponent;
  @ViewChild('category') categoryComponent!:CategoryComponent;
  @ViewChild('footer') footernavComponent!:FooternavComponent;
  @ViewChild('cart') cartShoppingComponent!:CartShoppingComponent;


  // mapa!:Mapboxgl.Map;

  panelLeft:boolean= false;
  nada:String=""
  mapaBox:boolean=false;

  // ocultarfalse:boolean=false;
  // ocultartrue:boolean=true;
  constructor(
    private authService:AuthService,
    private modalService:NgbModal,
    private customerService:CustomerService,
  ){}
  mapa!:Mapboxgl.Map;
  contador:number=0;
  NombreUsuarioBienvenida:String="";
  usuarioLogin:any;
  ocultarMotorista:boolean=true;
  ocultarPanelLeft:boolean=true;
  ocultarMotoristaDiv:boolean=false;
  ocultarSolicitudDiv:boolean=true;
  categoryVisual:boolean=true;
  companyVisual:boolean=false;
  idUsuario:any;
  stadeComponents:string="Category";
  stadePage:String="login";
  tokenss:any="";
  ngOnInit(): void {
    (Mapboxgl as any).accessToken = environment.mapboxKey;

    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-87.17168403184586, 14.087589347753948],
      zoom: 12.99
    });
    this.crearMarcador(-87.17168403184586, 14.087589347753948);



    //console.log("usuario Login:" , this.usuarioLogin);
    var tokens = localStorage.getItem('token');


    var token = {"token":tokens};
    this.tokenss = tokens;
    //console.log(token)
    this.authService.authe(token).subscribe(
      res=>{
        // console.log(res.authData.data);
        // para el nombre
        this.headerComponent.nombreUsuarioHeader=res.authData.data.nombreUsuario;
        this.headerComponent.urlImagenUsuario=res.authData.data.UrlFoto;
        var cadena = res.authData.data.nombreUsuario.split(" ");
        this.NombreUsuarioBienvenida=cadena[0];
        this.idUsuario=res.authData.data._id;
        this.productCompany.idUsuario=res.authData.data._id;
        this.ocultarSolicitudDiv=res.authData.data.solicitud;
        if(res.authData.data.tipoUsuario=="administrador"){
          location.href= ('vejadelivery.herokuapp.com/');
        };
        if(res.authData.data.tipoUsuario=="motorista"){
          this.ocultarMotorista=true;

        }else{
          this.ocultarMotorista=false;
        };
      },
      error=>{
        console.log(error);
        localStorage.removeItem('token');
        location.reload();
      }
    );
    //this.companyComponent.ocultardatas= false;
  }

  crearMarcador(lng:number,lat:number){
    var marker = new Mapboxgl.Marker({
      draggable:true
    })
    .setLngLat([lng,lat])
    .addTo(this.mapa);

    marker.on('drag',()=>{
      //console.log(marker.getLngLat());
      this.productCompany.obtnerDataGps(marker.getLngLat());
    })
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
    //console.log("Estado del los componentes", evento);
    this.stadeComponents=evento.url;
    if(evento.url=="Category"){
      //console.log("url y idUsuario Appcustomer", evento.url,this.idUsuario);
      this.companyComponent.ocultardatas=false;
      this.categoryComponent.ocultardatas=true;
      this.registerComponent.ocultardatas=false;
      this.myPerfilComponent.ocultardatas=false;
      this.productCompany.ocultardatas=false;
      this.cartShoppingComponent.ocultardatas=false;
    }
    if(evento.url=="Company"){
      //console.log("url y idUsuario Appcustomer", evento.url,this.idUsuario);
      this.companyComponent.recibirDataIdUsuario(evento.id,true);
      this.categoryComponent.ocultardatas=false;
      this.productCompany.ocultardatas=false;
      this.registerComponent.ocultardatas=false;
      this.myPerfilComponent.ocultardatas=false;
      this.cartShoppingComponent.ocultardatas=false;
    }
    if(evento.url=="Companys"){
      this.categoryComponent.ocultardatas=true;
      this.companyComponent.ocultardatas=false;
      this.productCompany.ocultardatas=false;
      this.registerComponent.ocultardatas=false;
      this.cartShoppingComponent.ocultardatas=false;
    }
    if(this.stadeComponents=="productCompany"){
      //console.log("entro a customer", evento);
      this.productCompany.selectFatherProduct(evento,true);
      this.companyComponent.ocultarData(false);
      this.registerComponent.ocultardatas=false;
      this.myPerfilComponent.ocultardatas=false;
      this.cartShoppingComponent.ocultardatas=false;
    };
    if(evento.url=="MyPerfil"){
      //console.log("Estado del los componentes", evento.url,this.idUsuario);
      this.categoryComponent.ocultardatas=false;
      this.companyComponent.ocultardatas=false;
      this.productCompany.ocultardatas=false;
      this.myPerfilComponent.ocultardatas=true;
      this.myPerfilComponent.informacionUser(this.idUsuario);
      this.registerComponent.ocultardatas=false;
      this.cartShoppingComponent.ocultardatas=false;
    }
    if(this.stadeComponents=="RegisterCompras"||this.stadeComponents=="RegisterList"){
      // console.log("entro a customer", evento.url);
      this.categoryComponent.ocultardatas=false;
      this.companyComponent.ocultardatas=false;
      this.productCompany.ocultardatas=false;
      this.myPerfilComponent.ocultardatas=false;
      this.registerComponent.selectRegiterFather(evento.url,true,this.idUsuario);
      this.cartShoppingComponent.ocultardatas=false;
    };
    if(evento.url=="gps"){
      //console.log("Estado del los componentes", evento.url,this.idUsuario);
      this.mapaBox=evento.data;
    }
    if(evento.url=="cartShopping"){
      //console.log("url y idUsuario Appcustomer", evento.url,this.idUsuario);
      this.companyComponent.ocultardatas=false;
      this.categoryComponent.ocultardatas=false;
      this.registerComponent.ocultardatas=false;
      this.myPerfilComponent.ocultardatas=false;
      this.productCompany.ocultardatas=false;
      this.cartShoppingComponent.ocultardatas=true;
      this.cartShoppingComponent.ObtenerData(this.idUsuario);
    }
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
  habilitarDivMotorista(){
    if(this.ocultarMotoristaDiv==false){
      this.ocultarMotoristaDiv=true;

    }else{
      this.ocultarMotoristaDiv=false;
    }
  }
  irMotorista(){
    location.href= ('vejadelivery.herokuapp.com/');
    //window.location.href = 'http://localhost:4204/';
  }
  ModalSolicitarSerMoto(modal:any){
    this.modalService.open(
      modal,
      {
        size:'xs',
        centered:false
      }
    );
  }
  checkedButton:boolean=false;
  cambioChecked(){
    var element = <HTMLInputElement> document.getElementById("is3dCheckBox");
    var isChecked = element.checked;
    this.checkedButton = isChecked;
    // console.log(isChecked);
  }
  enviarSolicitud(){
    // console.log(this.idUsuario);
    this.customerService.solicitudMotorista(this.idUsuario).subscribe(
      res=>{
        // console.log(res);
        this.modalService.dismissAll();
      },
      error=>{
        console.log(error);
      }
    )
  }

  /// para el carrito

  sumarCarrito(e:any){
    // console.log('se ejecuto el evento', e)
    this.footernavComponent.setCantidadCarrito(e);
  }

  verCarritoCompras(e:any){
    this.productCompany.verCarritoCompras(e);
  }


}
