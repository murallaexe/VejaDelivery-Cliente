import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {faMapMarker } from '@fortawesome/free-solid-svg-icons'
import { CategoriasService } from 'src/app/Service/categorias.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companySelection:string="productCompany";
  ocultardatas:boolean=false;
  idCatetegoria:any;
  nombreCatgoria:any;
  idCompania:any;
  companys:any;
  @Output() onSelectCompany = new EventEmitter();
  constructor(private categoriasService:CategoriasService) { }

  ngOnInit(): void {
    //this.idCate = localStorage.getItem('_id');
    //console.log("Id categorias :", this.idCatetegoria);
    this.categoriasService.ObtenerOneCategorias(this.idCatetegoria).subscribe(
      res=>{
        console.log(res);
        this.companys=res;
      },
      error=>console.log(error)
    )
  }
  faMapMarked=faMapMarker;
  SelectCompany(idcompania:any){
    //console.log()
    var enviar ={
      url:this.companySelection,
      id: this.idCatetegoria,
      idcompania: idcompania,
      nombreCatgoria:this.nombreCatgoria
    }
    this.onSelectCompany.emit(enviar);
  }
  irAtras(){
    // location.reload();
    var enviar ={
      url:"CompanyAtras",
      id: this.idCatetegoria,
    }
    console.log("enviar : ",enviar);
    this.onSelectCompany.emit(enviar);
  }
  public recibirDataIdUsuario(idUsuario:any, fal:any){
    //console.log("data company: ",idUsuario);
    this.categoriasService.ObtenerOneCategorias(idUsuario).subscribe(
      res=>{
        console.log(res);
        this.companys=res;
        this.nombreCatgoria=res.nombreCategoria;
        //this.idCompania=res._id;
        //console.log("ids categoria: ",this.idCatetegoria,"id compañia: ",this.idCompania);
      },
      error=>console.log(error)
    )
    this.ocultardatas=fal;
    this.idCatetegoria=idUsuario;
  }
  ocultarData(data:any){
    this.ocultardatas=data;
  }
}
