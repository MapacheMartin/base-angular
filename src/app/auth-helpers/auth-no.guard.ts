import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { authService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthNoGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: authService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    await this.authenticationService.checkToken();
    const isAuth = this.authenticationService.isAuthenticated;

    if (!isAuth) {
      return true;
    }

    this.router.navigateByUrl('/inicio');
    return false;
  }
}
