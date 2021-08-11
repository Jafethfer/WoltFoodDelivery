import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IsLoggedInService } from './is-logged-in.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultGuard implements CanActivate {

  constructor(private loggedin: IsLoggedInService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
    if(this.loggedin.isLoggedIn()){
      if(this.loggedin.role=="Cliente"){
        console.log('Estas logueado')
        this.router.navigate(['usuarios'])
      }else if(this.loggedin.role=="Motorista"){
        console.log('Estas logueado')
        this.router.navigate(['motorista'])
      }else if(this.loggedin.role=="Administrador"){
        console.log('Estas logueado')
        this.router.navigate(['administrador'])
      }
      return false;
    }else{
      return true;
    }
  }
  
}
