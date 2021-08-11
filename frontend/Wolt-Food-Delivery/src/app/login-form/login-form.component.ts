import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IsLoggedInService } from '../is-logged-in.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  })

  get email(){return this.loginForm.get('email')}
  get password(){return this.loginForm.get('password')}

  constructor(private httpClient: HttpClient, private router: Router, private loginService: IsLoggedInService) { }

  ngOnInit(): void {
  }

  checkLogin(){
    this.httpClient.post('http://localhost:3000/login',
    {
      email: this.email?.value,
      password: this.password?.value
    })
    .subscribe((results:any)=>{
      if(results==false){
        alert('Usuario o contrasena incorrectos')
      }else{
        if(results.role=="Cliente"){
          this.loginService.loggedIn=true
          this.router.navigateByUrl('usuarios',{state: results})
        }else if(results.role=="Motorista"){
          this.loginService.loggedIn=true
          this.router.navigateByUrl('motorista',{state: results})
        }else if(results.role=="Administrador"){
          this.loginService.loggedIn=true
          this.router.navigateByUrl('administrador',{state: results})
        }else{
          alert('Error de roles, contacte al servicio tecnico')
        }
      }
    })
  }

}
