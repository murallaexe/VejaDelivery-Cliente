import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  constructor(private httpClient:HttpClient) { }
  GuardarOrden(informacion:any):Observable<any>{
    return this.httpClient.post(`http://localhost:8888/ordenes`,{
      idOrden:informacion.idOrden,
      empresa:informacion.empresa,
      producto:informacion.producto,
      precioProducto:informacion.precioProducto,
      cantidadProducto:informacion.cantidadProducto,
      tipoEntrega:informacion.tipoEntrega,
      tiempoEntrega:informacion.tiempoEntrega,
      metodoPago:informacion.metodoPago,
      numeroPago:informacion.numeroPago,
      idCliente:informacion.idCliente,
      nombreCliente:informacion.nombreCliente,
      telefonCliente:informacion.telefonCliente,
      descripcionPedido:informacion.descripcionPedido,
      direccioncliente:informacion.direccioncliente,
      
    });
  }
  ObtenerContador():Observable<any>{
    return this.httpClient.get(`http://localhost:8888/ordenes/count`,{}
  )};
}
