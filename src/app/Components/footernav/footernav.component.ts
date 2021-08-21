import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faClipboard, faHome, faShoppingCart, faUserCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-footernav',
  templateUrl: './footernav.component.html',
  styleUrls: ['./footernav.component.css']
})
export class FooternavComponent implements OnInit {
  @Output() onFooter = new EventEmitter();
  @Output() onVerCarritoCompras = new EventEmitter();
  
  
  faClipboard=faClipboard; 
  faHome=faHome;
  faShopping=faUserCircle;
  idUsario:string="";
  carritoArray:any=[];
  // para el carrito
  faShoppingCart = faShoppingCart;
  faCircle = faCircle;
  cantidadCarrito:any=0;



  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    
    this.carritoArray=localStorage.getItem('carrito');
    this.cantidadCarrito=JSON.parse(this.carritoArray).length;
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

  carrito(){
    console.log('ver carrito de compra');
    this.onFooter.emit({url:'cartShopping',data:'data'});
  }

  setCantidadCarrito(cantidad:any){
    this.cantidadCarrito = cantidad;
  }
}
