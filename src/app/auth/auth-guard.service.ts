import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem('jwtToken')) {
      this.router.navigate(['/login']);
      return false;
    }
    this.router.navigate(['']);
    return true;
  }
}
