import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/Service/customer.service';
import { OrdenesService } from 'src/app/Service/ordenes.service';

@Component({
  selector: 'app-cart-shopping',
  templateUrl: './cart-shopping.component.html',
  styleUrls: ['./cart-shopping.component.css']
})
export class CartShoppingComponent implements OnInit {
  ocultardatas:Boolean=false;
  carritoArray:any=[];
  productosArray:any=[];
  tarjetasArray:any=[];
  nombre:String="";
  numeroTel:string="";
  description:String= "";
  metodoPago:String="Efectivo";
  direccion:String="";
  idusuario:String="";
  totalPrecio:number=0;
  numeroTarjeta:String="";
  ocultarTarjeta:boolean=false;
  buttonValid:boolean=false
  constructor(
    private customerService:CustomerService,
    private ordenesService:OrdenesService
  ) { }

  ngOnInit(): void {
    //console.log("entro");
    this.carritoArray=localStorage.getItem('carrito');
    this.carritoArray=JSON.parse(this.carritoArray);
    // console.log(this.carritoArray);

    for(var i=0;i<this.carritoArray.length;i++){
      this.totalPrecio= this.totalPrecio+this.carritoArray[i].precio;
      this.productosArray[i] ={
        empresa: this.carritoArray[i].nombreEmpresa,
        producto: this.carritoArray[i].marcaProducto+" / "+this.carritoArray[i].nombreProducto,
        precioProducto: this.carritoArray[i].precio,
        cantidadProducto: this.carritoArray[i].cantidadPedir,
      }
    }
    console.log(this.totalPrecio);
  }
  ObtenerData(data:any){
    console.log(data);
    this.idusuario=data
    this.customerService.obtenerInformacionUnUsuario(data).subscribe(
      res=>{
        console.log(res);
        this.tarjetasArray=res.tarjetas;
        this.nombre=res.nombreUsuario;
        this.numeroTel=res.telefono;
        this.direccion=res.pais+", "+res.ciudad+", "+res.coloniaProvicia;
      },
      error => { 
        console.log(error);
      }
    )
  }
  cambiosdeValid(){
    //console.log(this.numeroTarjeta);
    if(
      this.nombre!=""&&
      this.direccion!=""&&
      this.numeroTel!=""&&
      (this.metodoPago=='Efectivo'||(this.metodoPago=='Tarjeta' && this.numeroTarjeta!=""))
    ){
      this.buttonValid=true;
    }else{
      this.buttonValid=false;

    }
  }
  guardarPedido(){
    console.log("entro");
    var IdOrden = 0;
    var tipoEntrega='Inmediata';
      var fecha = new Date();
      var tiempoEntrega = 'fecha: '+fecha.getFullYear()+"-"+fecha.getMonth()+'-'+fecha.getDate()+", ";
      //console.log(fecha.getMinutes()+30);
      if((fecha.getMinutes()+30)>60){
        tiempoEntrega = tiempoEntrega + "hora: "+(fecha.getHours()+1)+":"+ (fecha.getMinutes()-30);
      }else{
        tiempoEntrega = tiempoEntrega + "hora: "+fecha.getHours()+":"+ (fecha.getMinutes()+30);
      }
    
    this.ordenesService.ObtenerContador().subscribe(
      result=>{
        IdOrden=result.length+1;
        var enviarOrdenCollection = {
          idOrden:IdOrden,

          tipoEntrega: tipoEntrega,
          tiempoEntrega:  tiempoEntrega,
          metodoPago:this.metodoPago,
          numeroPago:this.numeroTarjeta,

          
          precioProducto:this.totalPrecio,
          cantidadProducto:1,

          idCliente:this.idusuario,
          nombreCliente:this.nombre,
          telefonCliente:this.numeroTel,
          descripcionPedido:this.description,
          direccioncliente:this.direccion,
        }
        console.log(enviarOrdenCollection);
        
        this.ordenesService.GuardarOrdenArray(enviarOrdenCollection).subscribe(
          res=>{
            
            console.log(res);
            for(let prod of this.productosArray){ 
              this.ordenesService.GuardarOrdenProductosArray(res._id,prod).subscribe(
                resultad=>{
                  console.log(resultad);
                },
                error=>console.log(error)
              )
            }
          },
          error=>{
            console.log(error);
          }
        );
        var enviarUsuario = {
          idOrden:IdOrden,

          empresa: 'Varios',
          producto: 'varios',
          precioProducto:this.totalPrecio,
          cantidadProducto:1,

          tipoEntrega: tipoEntrega,
          tiempoEntrega:  tiempoEntrega,
          metodoPago:this.metodoPago,
          numeroPago:null,
        }
        this.customerService.guardarOrden(this.idusuario,enviarUsuario).subscribe(
          res=>{
            //console.log(res);
            localStorage.removeItem('carrito');
            location.reload();
          },
          error=>console.log(error)
        )
      },
      error=>console.log(error)
    )
    //this.ordenesService.GuardarOrdenArray()
  }
  ValidButton(metod:any){

    if(metod=='metodo1' && this.metodoPago=='Tarjeta'){
      this.ocultarTarjeta=true;
    }else{
      this.ocultarTarjeta=false;
    }
  }
}
