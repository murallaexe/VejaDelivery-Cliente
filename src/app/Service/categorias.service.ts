import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private httpClient:HttpClient) { }
  ObtenerCategorias():Observable<any>{
    return this.httpClient.get(`http://localhost:8888/categorias`,{});
  }
  ObtenerOneCategorias(IdCAtegorias:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/categorias/${IdCAtegorias}`,{});
  }
  obtenercompania(IdCAtegorias:any,IdCompania:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/categorias/${IdCAtegorias}/productos/${IdCompania}`,{});
  }
  obtenerDataOrden(IdCategorias:any,IdCompania:any):Observable<any>{
    return this.httpClient.get(`http://localhost:8888/categorias/${IdCategorias}/comercio/${IdCompania}/producto/`,{});
  }
}
