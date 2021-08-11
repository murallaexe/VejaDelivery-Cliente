import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient:HttpClient,
    private router:Router,
  ){}
  
  login(informacion:any):Observable<any>{
    return this.httpClient.post(`http://localhost:8888/usuarios/login`,{
      email: informacion.email,
      password: informacion.password
    })
  }
  authe(informacion:any):Observable<any>{
    // return informacion;
    return this.httpClient.post(`http://localhost:8888/usuarios/posts`,{
      Authorization: informacion.token
    })
  }
  loggendin():boolean{
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/VejaDelivery/Login'])
  }
}
