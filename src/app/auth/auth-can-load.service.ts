import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';

@Injectable()
export class AuthCanLoad implements CanLoad {
  constructor(private router: Router) {}

  canLoad(): boolean {
    if (!localStorage.getItem('jwtToken')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
