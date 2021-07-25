import { Component, OnInit } from '@angular/core';
import { faSitemap, faCut , faShoppingBag, faIndustry,faGlassCheers, faCar, faCoffee,faHeartbeat,faLaptop,faPlus, faSuitcase,faHandshake, faThList, faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-panel-left',
  templateUrl: './panel-left.component.html',
  styleUrls: ['./panel-left.component.css']
})
export class PanelLeftComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  faSitemap = faSitemap; 
  faCut = faCut;
  faShoppingBag = faShoppingBag; 
  faIndustry =faIndustry;
  faGlassCheers =faGlassCheers;
  faCar = faCar;
  faCoffee = faCoffee;
  faHeartbeat =faHeartbeat;
  faLaptop =faLaptop;
  faPlus =faPlus;
  faSuitcase = faSuitcase;
  faHandshake =faHandshake;
  faThList = faThList;
  faStar = faStar;
}
