import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IsLoggedInService } from './is-logged-in.service';

@Injectable({
  providedIn: 'root'
})
export class LogInGuardGuard implements CanActivate {

  constructor(private isLoggedIn:IsLoggedInService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    if(this.isLoggedIn.isLoggedIn()){
      return true;
    }else{
      return false
    }
  }
  
}
