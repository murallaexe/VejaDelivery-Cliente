import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCreditCard,faQuestion,faUser,faEnvelope,faAsterisk, faLock, faTrash} from '@fortawesome/free-solid-svg-icons'
import { validate } from 'json-schema';
import { CustomerService } from 'src/app/Service/customer.service';
@Component({
  selector: 'app-my-perfil',
  templateUrl: './my-perfil.component.html',
  styleUrls: ['./my-perfil.component.css']
})
export class MyPerfilComponent implements OnInit {
  idUusario:String="";
  ocultardatas:boolean=false;
  tarjetasArray:any;
  disabledb:boolean=false;
  errorTarjeta:boolean=false;
  constructor(private customerService:CustomerService) { }
  

  formularioInfoUsuario = new FormGroup({
    nombre : new FormControl(''),
    pais : new FormControl(''),
    ciudad : new FormControl(''),
    colonia : new FormControl(''),
    numTelefono : new FormControl(''),
    descripcion : new FormControl(''),
  });
  formularioUsuacioAcceso = new FormGroup({
    apodo : new FormControl(''),
    email : new FormControl(''),
    contrasenia : new FormControl(''),
  });
  formularioNewTarjeta = new FormGroup({
    nombreTarjeta : new FormControl('',[Validators.required]),
    numeroTarjeta : new FormControl('',[Validators.required]),
    vencimiento : new FormControl('',[Validators.required]),
    codigoSeguridad : new FormControl('',[Validators.required]),
  })
  ngOnInit(): void {
  }
  faCreditCard=faCreditCard;
  faQuestion =faQuestion;
  faUser =faUser;
  faEnvelope =faEnvelope;
  faAsterisk =faAsterisk;
  faLock=faLock;
  faTrash=faTrash;

  informacionUser(data:String){
    console.log("id en myPerfilComponent: ", data);
    this.idUusario=data;
    this.customerService.obtenerInformacionUnUsuario(data).subscribe(
      res=>{
        console.log(res);
        this.formularioInfoUsuario.get('nombre')?.setValue(res.nombreUsuario);
        this.formularioInfoUsuario.get('pais')?.setValue(res.pais);
        this.formularioInfoUsuario.get('ciudad')?.setValue(res.ciudad);
        this.formularioInfoUsuario.get('colonia')?.setValue(res.coloniaProvicia);
        this.formularioInfoUsuario.get('numTelefono')?.setValue(res.telefono);
        this.formularioInfoUsuario.get('descripcion')?.setValue(res.descripcion);
        
        this.formularioUsuacioAcceso.get('apodo')?.setValue(res.apodo);
        this.formularioUsuacioAcceso.get('email')?.setValue(res.correoUsuario);
        this.formularioUsuacioAcceso.get('contrasenia')?.setValue(res.contraseniaUsuario);

        this.tarjetasArray= res.tarjetas;
      },
      error=>console.log(error)
    )
  }
  guardarCambios(){

    var enviar ={
      nombreUsuario : this.formularioInfoUsuario.value.nombre ,
      emailUsuario : this.formularioUsuacioAcceso.value.email ,
      passwordUsuario : this.formularioUsuacioAcceso.value.contrasenia ,
      descripcion : this.formularioInfoUsuario.value.descripcion ,
      pais : this.formularioInfoUsuario.value.pais ,
      ciudad : this.formularioInfoUsuario.value.ciudad ,
      coloniaProvicia : this.formularioInfoUsuario.value.colonia ,
      telefono : this.formularioInfoUsuario.value.numTelefono ,
      apodo : this.formularioUsuacioAcceso.value.apodo ,
    };
    console.log("id usuario :", this.idUusario,enviar);
    // console.log("id data info: ", this.formularioInfoUsuario.value, this.formularioUsuacioAcceso.value);
    this.customerService.CambiosInfoUsuario(this.idUusario,enviar).subscribe(
      res=>{
        console.log(res);
        location.reload();
      },
      error=>console.log(error)
    )
  }
  eliminarTarjeta(idTarjeta:any){
    console.log("ID tarjeta a eliminar : ",idTarjeta);
    this.customerService.eliminarTarjetaCredito(this.idUusario,idTarjeta).subscribe(
      res=>{
        console.log(res);
        this.informacionUser(this.idUusario);
      },
      error=>console.log(error)
    )
  }
  guardarTarjeta(){
    console.log("data new tarjeta :",this.idUusario,this.formularioNewTarjeta.value);
    this.customerService.guardarTarjetaCredito(this.idUusario,this.formularioNewTarjeta.value).subscribe(
      res=>{
        console.log(res);
        //location.reload();
        this.informacionUser(this.idUusario);
      },
      error=>console.log(error)
    )
  }
  GenerarNombreTarjeta(){
    var visaRegEx = /^(?:[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}(?:[0-9]{3})?)$/;
    if(visaRegEx.test(this.formularioNewTarjeta.value.numeroTarjeta)===false){
      //alert("no permitida")
      this.errorTarjeta=true;
    }else{
      this.errorTarjeta=false;
      if(this.formularioNewTarjeta.value.numeroTarjeta==""){
        this.formularioNewTarjeta.get('nombreTarjeta')?.setValue("");
      }else{
        if(this.formularioNewTarjeta.value.numeroTarjeta.charAt(0)==3){
          this.formularioNewTarjeta.get('nombreTarjeta')?.setValue("American Express");
        }else if(this.formularioNewTarjeta.value.numeroTarjeta.charAt(0)==4){
          this.formularioNewTarjeta.get('nombreTarjeta')?.setValue("VISA");
        }else if(this.formularioNewTarjeta.value.numeroTarjeta.charAt(0)==5){
          this.formularioNewTarjeta.get('nombreTarjeta')?.setValue("Mastercard");
        }else if(this.formularioNewTarjeta.value.numeroTarjeta.charAt(0)==6){
          this.formularioNewTarjeta.get('nombreTarjeta')?.setValue("Discovery");
        }else{
          this.formularioNewTarjeta.get('nombreTarjeta')?.setValue("No encontrado");
        };
      };
    };
    console.log(this.formularioNewTarjeta.value.numeroTarjeta.charAt(0));
  }
}
