import { Component, OnInit } from '@angular/core';
import { faUser,faUtensils,faTasks,faShoppingBag,faIndustry,faGlassCheers } from '@fortawesome/free-solid-svg-icons'
import { faFacebook,faTwitter,faInstagram,faPinterest} from '@fortawesome/free-brands-svg-icons'
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
}
