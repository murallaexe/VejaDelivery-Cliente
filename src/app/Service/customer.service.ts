import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient : HttpClient) { }
  guardarUsario(informacion:any):Observable<any>{
    return this.httpClient.post(`http://localhost:8888/usuarios/`,{
      nombreUsuario: informacion.nombreUsuario,
      emailUsuario:informacion.emailUsuario,
      passwordUsuario:informacion.passwordUsuario,
      descripcion:informacion.descripcion,
      pais:"nodefinido",
      ciudad:"",
      coloniaProvicia:"",
      telefono:"",
      apodo:"",
      tarjetas:[],
      tipoUsuario:"cliente"
    })
  }
  obtenerInformacionUnUsuario(idUsuario:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/usuarios/${idUsuario}`,{});
  }
  CambiosInfoUsuario(idUsuario:any,informacion:any):Observable<any>{
    return this.httpClient.put(`http://localhost:8888/usuarios/${idUsuario}`,{
      nombreUsuario:informacion.nombreUsuario,
      emailUsuario:informacion.emailUsuario,
      passwordUsuario:informacion.passwordUsuario,
      descripcion:informacion.descripcion,
      pais:informacion.pais,
      ciudad:informacion.ciudad,
      coloniaProvicia:informacion.coloniaProvicia,
      telefono:informacion.telefono,
      apodo:informacion.apodo,
      UrlFoto:informacion.UrlFoto,
    })
  }
  guardarTarjetaCredito(idUsuario:any,informacion:any):Observable<any>{
    return this.httpClient.post(`http://localhost:8888/usuarios/${idUsuario}/tarjetaCredito`,{
      nombreTarjeta : informacion.nombreTarjeta, 
      numeroTarjeta : informacion.numeroTarjeta, 
      vencimiento : informacion.vencimiento, 
      codigoSeguridad : informacion.codigoSeguridad, 
    })
  }
  eliminarTarjetaCredito(idUsuario:any,idTarjeta:any):Observable<any>{
    return this.httpClient.delete(`http://localhost:8888/usuarios/${idUsuario}/tarjetaCredito/${idTarjeta}`,{})
  }
  
  guardarOrden(idUsuario:any,informacion:any):Observable<any>{
    return this.httpClient.post(`http://localhost:8888/usuarios/${idUsuario}/ordenes`,{
      idOrden:informacion.idOrden,
      empresa:informacion.empresa,
      producto:informacion.producto,
      precioProducto:informacion.precioProducto,
      cantidadProducto:informacion.cantidadProducto,
      tipoEntrega:informacion.tipoEntrega,
      tiempoEntrega:informacion.tiempoEntrega,
      metodoPago:informacion.metodoPago,
      numeroPago:informacion.numeroPago,
    })
  }
  obtenerRegistro(idUsuario:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/usuarios/${idUsuario}/registro`,{});
  }
}
