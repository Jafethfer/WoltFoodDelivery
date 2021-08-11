import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  checkLogin(){
    this.httpClient.post('http://localhost:3000/login',
    {
      email: this.email,
      password: this.password
    })
    .subscribe(results=>{
      console.log(results)
    })
  }

}
