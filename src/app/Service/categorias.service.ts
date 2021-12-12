import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private httpClient:HttpClient) { }
  ObtenerCategorias():Observable<any>{
    return this.httpClient.get(`https://vejadelivery.herokuapp.com/categorias`,{});
  }
  ObtenerOneCategorias(IdCAtegorias:any):Observable<any>{
    return this.httpClient.get(`https://vejadelivery.herokuapp.com/categorias/${IdCAtegorias}`,{});
  }
  obtenercompania(IdCAtegorias:any,IdCompania:any):Observable<any>{
    return this.httpClient.get(`https://vejadelivery.herokuapp.com/categorias/${IdCAtegorias}/productos/${IdCompania}`,{});
  }
  obtenerDataOrden(IdCategorias:any,IdCompania:any):Observable<any>{
    return this.httpClient.get(`https://vejadelivery.herokuapp.com/categorias/${IdCategorias}/comercio/${IdCompania}/producto/`,{});
  }
}
