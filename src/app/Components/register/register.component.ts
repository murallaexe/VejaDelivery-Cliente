import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/Service/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectRegister:string="";
  ocultardatas:boolean=false;
  ocultarDetalles:boolean=false;
  ocultarPedidos:boolean=true;
  ocultarCompras:boolean=true;
  ocultarSerialTarjeta:boolean=true;
  registerArray:any;
  registerArrayOne:any=[];
  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
  }
  
  selectRegiterFather(evento:any,data:any,idUsuario:any){
    this.ocultarPedidos=true;
    this.ocultarCompras=true;
    this.ocultarDetalles=false;
    // console.log("Registro en la clase registerComponert: ",this.selectRegister);
    // console.log("idUsuario: ",idUsuario);
    this.selectRegister=evento;
    this.ocultardatas=data;
    this.customerService.obtenerRegistro(idUsuario).subscribe(
      res=>{
        // console.log(res.listaPedidos);
        this.registerArray=res.listaPedidos;
      },
      error=>console.log(error)
    )
  }
  VerDetalles(idRegster:any){
    this.ocultarDetalles=true;
    this.ocultarPedidos=false;
    this.ocultarCompras=false;
    for(let register of this.registerArray){
      if(register._id==idRegster){
        this.registerArrayOne[0]=register;
      }
    };
    if(this.registerArrayOne[0].metodoPago=='Efectivo'){
      this.ocultarSerialTarjeta=false;
    }else{
      this.ocultarSerialTarjeta=true;
      var serialOcu = this.registerArrayOne[0].numeroPago.split('-');
      serialOcu[0]='XXXX-';
      serialOcu[1]='XXXX-';
      serialOcu[2]='XXXX-';
      this.registerArrayOne[0].numeroPago=''
      for(let serial of serialOcu){
        this.registerArrayOne[0].numeroPago = this.registerArrayOne[0].numeroPago + serial;
      }
    }
  }
  iratras(){
    this.ocultarDetalles=false;
    this.ocultarPedidos=true;
    this.ocultarCompras=true;
  }
}
