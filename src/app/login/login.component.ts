import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../Service/customer.service';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() onUsuarios = new EventEmitter();

  validUsuario:boolean=false;
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required])
  })
  get email(){
    return this.formLogin.get('email');
  }
  get password(){
    return this.formLogin.get('password');
  }
  constructor(
    private customerService:CustomerService,
    private router:Router,
    private authService:AuthService,
  ) { }

  ngOnInit(): void {
  }
  Login(){
    //console.log("login usuario es : ",this.formLogin.value);
    this.authService.login(this.formLogin.value).subscribe(
      res=>{
        console.log(res);
        if(res.Code==0){
          this.validUsuario=true;
        }else{
          this.validUsuario=false;
          this.onUsuarios.emit(res.data);
          // this.onUsuario.emit(this.validUsuario);
          localStorage.setItem('token',res);
          this.router.navigate(['VejaDelivery/AppCustomer']);
        }
      },
      error=>{
        console.log(error);
      }
    );
  }
}
