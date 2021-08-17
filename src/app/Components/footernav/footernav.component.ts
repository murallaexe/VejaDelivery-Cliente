import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faClipboard, faHome, faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-footernav',
  templateUrl: './footernav.component.html',
  styleUrls: ['./footernav.component.css']
})
export class FooternavComponent implements OnInit {
  @Output() onFooter = new EventEmitter();
  faClipboard=faClipboard; 
  faHome=faHome;
  faShopping=faUserCircle;
  idUsario:string="";
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
  }
  home(){
    this.onFooter.emit({url:'Category'});
  }
  register(){
    this.onFooter.emit({url:'RegisterList'});
  }
  myProfile(){
    this.onFooter.emit({url:'MyPerfil'});
  }
}
