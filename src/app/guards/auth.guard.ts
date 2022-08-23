import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    if (
      !localStorage.getItem('accessToken') ||
      !localStorage.getItem('refreshToken')
    ) {
      this.router.navigate(['/signIn']);
      return false;
    }
    return true;
  }
}
