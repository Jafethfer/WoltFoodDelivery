import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInService {
  loggedIn:boolean = false
  role:any
  isLoggedIn(){
    return this.loggedIn
  }

  constructor() { }

}
