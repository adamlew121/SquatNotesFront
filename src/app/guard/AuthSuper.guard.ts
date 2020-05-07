import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthSuperGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user);
    if (user && user.type === 1) {
      return true;
    }

    this.router.navigate([''], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
