import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterService } from './services/router.service';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private authService : AuthenticationService,private routerService:RouterService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      //check whether the user is authenticated or not
      let isAuthenticated : boolean = false;
     let promise =  this.authService.isUserAuthenticated(this.authService.getBearerToken());
     
    return promise.then( (authenticated) =>{
      if(!authenticated){
        this.routerService.routeToLogin();
      }
      return authenticated;
    });
  }
}
