import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInService {
  loggedIn:boolean = false
  isLoggedIn(){
    return this.loggedIn
  }

  constructor() { }

}
