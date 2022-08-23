import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ExitMainGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    if (
      localStorage.getItem('accessToken') &&
      localStorage.getItem('refreshToken')
    ) {
      this.router.navigate(['/main']);
      return false;
    }
    return true;
  }
}
