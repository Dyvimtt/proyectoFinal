import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutorizacionService } from './autorizacion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private autorizacionService: AutorizacionService, private router: Router) {}

  canActivate(): boolean {
    if (this.autorizacionService.estaLogueado()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
