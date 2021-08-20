import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IsLoggedInService } from './is-logged-in.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogInGuardGuard implements CanActivate {

  constructor(private isLoggedIn:IsLoggedInService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    if(this.isLoggedIn.isLoggedIn()){
      return true;
    }else{
      this.router.navigate([''])
      return false
    }
  }
  
}
