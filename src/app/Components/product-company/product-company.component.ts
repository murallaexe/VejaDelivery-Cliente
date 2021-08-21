import { Component, EventEmitter, OnInit, Output, NgModule, ViewChild } from '@angular/core';
import {faArrowAltCircleLeft, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as Mapboxgl from 'mapbox-gl';

import { CategoriasService } from 'src/app/Service/categorias.service';
import { CustomerService } from 'src/app/Service/customer.service';
import { OrdenesService } from 'src/app/Service/ordenes.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-product-company',
  templateUrl: './product-company.component.html',
  styleUrls: ['./product-company.component.css']
})
export class ProductCompanyComponent implements OnInit {
  @Output() onProductoSelection = new EventEmitter();
  @Output() onSumarCarrito = new EventEmitter();
  

  //para el carrito
  @ViewChild('modalCantidadProducto') modalCantidadProducto!: NgbModal;
  carrito:any=[];
  faCircle = faCircle;
  cantidadPedir:Number=0;
  productoSeleccionado:any=[];
  comprarCarrito:boolean=false;


  mapa!:Mapboxgl.Map;
  faArrowAltCircleLeft=faArrowAltCircleLeft;

  constructor(
    private categoriasService:CategoriasService,
    private customerService:CustomerService,
    private ordenesService:OrdenesService,
    private modalServices: NgbModal
  ){}
  horaInmediata:any;
  selectProduct:string="Combos";
  ProductoSelection="Company";
  pedidoLista:string="";
  idCategoria:String="";
  idCompania:String="";
  idUsuario:String="";
  idProductos:String="";
  productosArray:any;
  checkSeleccionado:any;
  nombreEmpresa:any;
  usuarioArray:any;
  tipoEntrega:any;
  nombreProducto:any;
  precioProducto:any;
  textErrorFecha:String="";
  textErrorHora:String="";
  tiempoEntrega:any;
  numeroTarjeta:String='';
  habiltarDescripcion:boolean=false;
  gpshablit:boolean=false;
  imagenComercio:string="";

  // formularios y ngModel
  direccion:String='';
  cantidadProducto:String='';
  metodoPago:String='';
  formHora = new FormGroup({
    fecha : new FormControl('',[Validators.required]),
    hora : new FormControl('',[Validators.required]),
  });
  formInfoPersonal = new FormGroup({
    nombre : new FormControl(''),
    numTelefono : new FormControl(''),
    DescripcionPedido : new FormControl(''),
  });
  //datos para habilitar el Frontend y valid
  activarDescs:boolean=true;
  activarConts:boolean=false;
  activarPres:boolean=false;
  ocultarTarjeta:boolean=false;
  ocultardatas:boolean=false;
  ocultarnombre:boolean=false;
  validFecha:boolean=false;
  diaSiguientes:boolean=false;
  entregainmediata:boolean=false;
  entregaProgramada:boolean=false;
  validHora:boolean=false;
  buttonDisability:boolean=false;
  ngOnInit(){
    // (Mapboxgl as any).accessToken = environment.mapboxKey;

    // this.mapa = new Mapboxgl.Map({
    //   container: 'mapa-mapbox',
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: [-87.1707396, 14.0865885],
    //   zoom: 12.99
    // });
    // this.crearMarcador(-87.1707396, 14.0865885);
  }
  crearMarcador(lng:number,lat:number){
    var marker = new Mapboxgl.Marker({
      draggable:true
    })
    .setLngLat([lng,lat])
    .addTo(this.mapa);

    marker.on('drag',()=>{
      console.log(marker.getLngLat());
    })
  }


  activarDesc(){
    this.activarDescs=true;
    this.activarPres=false;
  }
  activarPre(){
    this.activarDescs=false;
    this.activarPres=true;
  }
  selectFatherProduct(evento:any,dataocultar:any){
    // console.log(evento,dataocultar);
    //console.log("idUsuario : ",this.idUsuario);
    this.ocultardatas=dataocultar;
    this.idCategoria=evento.id;
    this.idCompania=evento.idcompania;
    this.categoriasService.obtenercompania(this.idCategoria,this.idCompania).
    subscribe(
      res=>{
        // console.log(res);
        this.nombreEmpresa=res.comercios[0].nombreEmpresa;
        this.productosArray=res.comercios;
        this.imagenComercio=res.comercios[0].imagenComercio;
        //console.log("Productos",res.comercios ,"_id :",res._id,"toda la data");
      },
      error=>console.log(error)
    );
    this.customerService.obtenerInformacionUnUsuario(this.idUsuario).subscribe(
      res=>{
        // console.log(res);
        this.usuarioArray=res;
        this.formInfoPersonal.get('nombre')?.setValue(res.nombreUsuario);
        this.formInfoPersonal.get('numTelefono')?.setValue(res.telefono);
        this.direccion=res.pais+", "+res.ciudad+", "+res.coloniaProvicia;
      })
  }
  irAtras(){
    this.selectProduct="Combos";
  }
  irAtrasW(){
    var enviar ={
      url:'Company',
      id: this.idCategoria,
    }
    //console.log("entro a ir atras de productos: ",this.ProductoSelection)
    this.onProductoSelection.emit(enviar);
  }
  ordenarYa(idProduct:any,datas:any){
    this.habiltarDescripcion=true;
    //console.log(datas);
    this.nombreProducto=datas.marcaProducto+" / "+datas.nombreProducto;
    this.precioProducto=datas.precio;
    if(this.selectProduct=="Combos"){
      this.selectProduct="genereOrders";
    }else{
      this.selectProduct="Combos";
    }
    //console.log(this.selectProduct);
    //console.log("Id productos: ",idProduct);
    this.idProductos=idProduct;
  }
  ordenarYaLista(idProduct:any,datas:any){
    this.habiltarDescripcion=false;
    //console.log(datas);
    this.nombreProducto="ver Lista"+" / "+datas.nombreProducto;
    this.precioProducto="por definir";
    if(this.selectProduct=="Combos"){
      this.selectProduct="genereOrders";
    }else{
      this.selectProduct="Combos";
    }
    //console.log(this.selectProduct);
    //console.log("Id productos: ",idProduct);
    this.idProductos=idProduct;
  }



  validFechaF(){
    var fecha = new Date();
    //console.log("fecha de hoy: ",fecha);
    //console.log("fecha de hoy: ",fecha.getDay());
    
    //console.log(" año: ", fecha.getFullYear()," mes: ",fecha.getMonth()," dia: ", fecha.getDate());
    var fechaArray = this.formHora.value.fecha.split("-")
    // //console.log(" fecha: ", fechaArray);
    var anio = parseInt(fechaArray[0]);
    var mes = parseInt(fechaArray[1]);
    var dia = parseInt(fechaArray[2]);
    //console.log(" año: ", anio," mes: ",mes," dia: ", dia);
    if(anio>=fecha.getFullYear()){
      if(mes>fecha.getMonth()){
        if(dia>=(fecha.getDate())){
          //console.log("correpto");
          this.validFecha=true;
          if(dia>(fecha.getDate())){
            this.diaSiguientes=true;
            ////console.log("Dia Mayor");
          }else{
            this.diaSiguientes=false;
          }
        }else{
          ////console.log("fecha dia menor");
          this.textErrorFecha="error : día ";
          this.validFecha=false;
        }
      }else{
        ////console.log("fecha mes menor");
        this.textErrorFecha="error : mes ";
        this.validFecha=false;
      }
    }else{
      ////console.log("fecha año menor");
      this.textErrorFecha="error : año ";
      this.validFecha=false;
    }
  }
  validHoraF(){
    var fecha = new Date();
    // console.log("fecha de hoy: ",fecha);
    //console.log("fecha de hoy: ",fecha.getMinutes());
    //console.log("hora : ", this.formHora.value.hora);
    var horaArray = this.formHora.value.hora.split(":");
    var hora = parseInt(horaArray[0]);
    var min = parseInt(horaArray[1]);
    //console.log(" hora: ", hora," min : ",min);
    
    if(this.validFecha==true){
      if((hora>fecha.getHours() || this.diaSiguientes==true)&&hora>=6&&hora<=22){
        if(min>fecha.getMinutes() || this.diaSiguientes==true){
          this.validHora=true;
        }else{
          //console.log("min menor");
          this.validHora=false;
          this.textErrorHora="error : min ";
        }
      }else{
        if(hora<6||hora>22){
          this.textErrorHora="Entregas de 6am a 10pm";
        }else{
          //console.log("hora menor");
          this.validHora=false;
          this.textErrorHora="error : hora";
        }
      }
    }else{
      this.textErrorHora="Corregir la fecha";
      this.validHora=false;
    }
    this.tiempoEntrega=  "fecha: "+ this.formHora.value.fecha+", hora: "+this.formHora.value.hora; 
  }
  displayEntrega(data:any){
    if(data==1){
      this.entregaProgramada=false;
      this.entregainmediata=true;
      this.tipoEntrega='Inmediata';
      var fecha = new Date();
      this.tiempoEntrega = 'fecha: '+fecha.getFullYear()+"-"+fecha.getMonth()+'-'+fecha.getDate()+", ";
      //console.log(fecha.getMinutes()+30);
      if((fecha.getMinutes()+30)>60){
        this.tiempoEntrega = this.tiempoEntrega + "hora: "+(fecha.getHours()+1)+":"+ (fecha.getMinutes()-30);
      }else{
        this.tiempoEntrega = this.tiempoEntrega + "hora: "+fecha.getHours()+":"+ (fecha.getMinutes()+30);
      }
    }else{
      this.entregaProgramada=true;
      this.entregainmediata=false;
      this.tipoEntrega='Programada';
    }
  }
  SelectPagos(data:any){
    //console.log('tarjetas',data);
    if(data==1){
      if(this.metodoPago=='Tarjeta'){
        //console.log("entro");
        this.ocultarTarjeta=true;
      }else{
        this.ocultarTarjeta=false;
        this.numeroTarjeta= 'null';
      }
    }else{
      this.numeroTarjeta = data;
    }
    //console.log(this.numeroTarjeta);
  }
  comprar(){
    //console.log("idCategoria es: ", this.idCategoria);
    //console.log("idEmpresas es: ", this.idCompania);
    //console.log("idProductos es: ", this.idProductos);
    var idOrdenesClient ="";
    var descripcion="";
    var IdOrden = 0;
    let validar=false;
    if(this.habiltarDescripcion==false){
      descripcion=this.pedidoLista;
      this.cantidadProducto='1';
    }else{
      descripcion=this.formInfoPersonal.value.DescripcionPedido; 
    };
    //console.log(descripcion,this.pedidoLista);
    this.ordenesService.ObtenerContador().subscribe(
      result=>{
        // console.log(result);
        IdOrden=result.length+1;
        
      this.categoriasService.obtenerDataOrden(this.idCategoria,this.idCompania).subscribe(
        res=>{
          //console.log(res);
          var enviarOrdenCollection = {
            idOrden:IdOrden,
            empresa: res.comercios[0].nombreEmpresa+" "+res.nombreCategoria,
            producto: this.nombreProducto,
            precioProducto:this.precioProducto,
            cantidadProducto:this.cantidadProducto,

            tipoEntrega: this.tipoEntrega,
            tiempoEntrega:  this.tiempoEntrega,
            metodoPago:this.metodoPago,
            numeroPago:this.numeroTarjeta,

            idCliente:this.idUsuario,
            
            nombreCliente:this.formInfoPersonal.value.nombre,
            telefonCliente:this.formInfoPersonal.value.numTelefono,
            descripcionPedido:descripcion,
            direccioncliente:this.direccion,
          }
          var enviarUsuario = {
            idOrden:IdOrden,

            empresa: res.comercios[0].nombreEmpresa+" "+res.nombreCategoria,
            producto: this.nombreProducto,
            precioProducto:this.precioProducto,
            cantidadProducto:this.cantidadProducto,

            tipoEntrega: this.tipoEntrega,
            tiempoEntrega:  this.tiempoEntrega,
            metodoPago:this.metodoPago,
            numeroPago:this.numeroTarjeta,
            
            
            
            
          
          }
          //console.log("datos de la orden",enviarOrdenCollection,enviarUsuario);
          if(this.metodoPago=='Tarjeta'&&(this.numeroTarjeta=='null'||this.numeroTarjeta=='')){
            alert('selecciones tarjeta');
          }else{
            this.customerService.guardarOrden(this.idUsuario,enviarUsuario).subscribe(
              res=>{
                //console.log(res);
              },
              error=>console.log(error)
            )
            this.ordenesService.GuardarOrden(enviarOrdenCollection).subscribe(
              res=>{
                // console.log(res);
                location.reload()
                ////setTimeout('document.location.reload()',1000);
              },
              error=>console.log(error)
            );
          }

        },
        error=>console.log(error)
      )
      },
      error=>console.log(error)
    )
  }
  ValidButton(){
    // console.log(
    //   this.formInfoPersonal.value.nombre,
    //   this.formInfoPersonal.value.numTelefono,
    //   this.cantidadProducto,
    //   this.direccion,
    //   this.metodoPago,
    //   this.entregainmediata,
    //   this.validHora,
    //   this.validFecha,
    //   'tarjeta:',this.numeroTarjeta
    // )
    if(
      this.formInfoPersonal.value.nombre!=''&&
      this.formInfoPersonal.value.numTelefono!=''&&
      this.cantidadProducto!=''&&
      this.direccion!=''&&
      this.metodoPago!=''&& (
        (
          this.validHora==true &&
          this.validFecha==true
        ) ||
        this.entregainmediata==true 
      )
      ){
        this.buttonDisability=true;
    }else{
      this.buttonDisability=false;
    }
  }
  habiltarGps(){
    if(this.gpshablit==false){
      this.gpshablit=true;
    }else{
      this.gpshablit=false;
    };
    // console.log(this.gpshablit);
    this.onProductoSelection.emit({url:'gps',data:this.gpshablit});
  }
  obtnerDataGps(data:any){
    // console.log(data);
    this.direccion="Longitud : "+data.lng+", Latitud : "+data.lat;
  }

  /// codigo para el carrito de compras

  infoProductoSeleccionado(producto:any,nombreEmpres:any){
    this.productoSeleccionado = producto;
    this.productoSeleccionado['nombreEmpresa']= nombreEmpres;
    this.modalServices.open(this.modalCantidadProducto)
    // console.log({"producto:":this.productoSeleccionado})
  }


  agregarCarrito(){
    this.modalServices.dismissAll();
    this.productoSeleccionado['cantidadPedir']= this.cantidadPedir;
    this.carrito.push(this.productoSeleccionado);
    // console.log('pedidos en el carrito:', this.carrito);
    localStorage.setItem("carrito",JSON.stringify(this.carrito));
    this.onSumarCarrito.emit(this.carrito.length)
  }

  verCarritoCompras(e:any){
    if (this.comprarCarrito) {
      this.comprarCarrito = false;
    }else if (this.comprarCarrito == false) {
      this.comprarCarrito = e.ver;  
    }
  }
}
