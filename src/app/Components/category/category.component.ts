import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faUser,faUtensils,faTasks,faShoppingBag,faIndustry,faGlassCheers } from '@fortawesome/free-solid-svg-icons'
import { faFacebook,faTwitter,faInstagram,faPinterest} from '@fortawesome/free-brands-svg-icons'
import { CategoriasService } from 'src/app/Service/categorias.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  selectCategory:string = "";
  categorias:any;
  ocultardatas:boolean=true;
  @Output() onSelectCategory = new EventEmitter();
  constructor(private categoriasService:CategoriasService) { }

  ngOnInit(): void {
    this.categoriasService.ObtenerCategorias()
    .subscribe(
      res=>{
        console.log(res);
        this.categorias=res;
      },
      error=>console.log(error)
    );
  }
  faUser=faUser;
  faUtensils=faUtensils;
  faTasks=faTasks;
  faFacebook=faFacebook;
  faTwitter=faTwitter;
  faInstagram=faInstagram;
  faPinterest=faPinterest;
  faShoppingBag=faShoppingBag;
  faIndustry=faIndustry;
  faGlassCheers=faGlassCheers;
  SelectCategory(data:any){
    this.selectCategory= 'Company';
    var enviar ={
      url:this.selectCategory,
      id: data,
    }
    //console.log("Select category:", this.selectCategory);
    this.onSelectCategory.emit(enviar);
  }
  ocultarBarr(data:any){
    this.ocultardatas=data;
  }
}
