import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  newUserForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    passwordAgain: new FormControl('',Validators.required)
  })

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  signUp(){
    if(this.newUserForm.valid && this.newUserForm.get('password')?.value==this.newUserForm.get('passwordAgain')?.value){
      this.httpClient.post('http://localhost:3000/signUp',{
        firstName: this.newUserForm.get('firstName')?.value,
        lastName: this.newUserForm.get('lastName')?.value,
        phone: this.newUserForm.get('phone')?.value,
        email: this.newUserForm.get('email')?.value,
        password: this.newUserForm.get('password')?.value
      })
      .subscribe((results:any)=>{
        console.log(results)
      })
    }else{
      if(this.newUserForm.get('password')?.value!=this.newUserForm.get('passwordAgain')?.value){
        alert('Las contraseñas no concuerdan')
      }else{
        alert('Uno o varios campos son requeridos')
      }
    }
  }

}
