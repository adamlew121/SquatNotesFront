import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthUserGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.type === 0) {
      return true;
    }

    this.router.navigate([''], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
