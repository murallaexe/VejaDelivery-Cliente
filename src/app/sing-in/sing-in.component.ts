import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import {faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingINComponent implements OnInit {
  UsersNew:any = [];//Arreglo de cualquier cosa
  formularioRegistrar = new FormGroup({
    nombreUsuario:new FormControl('',[Validators.required]),
    emailUsuario:new FormControl('',[Validators.required,Validators.email]),
    passwordUsuario:new FormControl('',[Validators.required]),
    password2:new FormControl('',[Validators.required]),
    descripcion:new FormControl('',[Validators.required])
  });
  backendHost:string = 'http://localhost:8888';
  validarButton:boolean= false;
  validarPassword:boolean= false;
  constructor( private httpClient:HttpClient) { }
  //constructor() { }
  get nombre(){
    return this.formularioRegistrar.get('nombreUsuario');
  }
  ngOnInit() {
    this.httpClient.get(`${this.backendHost}/usuarios`)
    .subscribe(res=>{
      this.UsersNew = res;
      //console.log(this.UsersNew);
    });
  }
  guardar(){
    if(this.formularioRegistrar.valid==false){
      this.validarButton=true;
    }else{
      this.validarButton=false;
      this.httpClient.post(`${this.backendHost}/usuarios`,this.formularioRegistrar.value)
      .subscribe((res:any)=>{
        console.log(res);
        this.UsersNew.push(res);
      });
    }
    console.log(this.formularioRegistrar.value);
    console.log('Formulario válido', this.formularioRegistrar.valid);
  }
  validPassword(){
    if(this.formularioRegistrar.get('passwordUsuario')?.value==this.formularioRegistrar.get('password2')?.value){
      this.validarPassword=false;
    }else{
      this.validarPassword=true;
    };
  }
  faEye=faEye;
  faEyeSlash=faEyeSlash;
}
