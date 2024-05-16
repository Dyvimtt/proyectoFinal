import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AutorizacionService } from '../services/autorizacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private autorizacionService: AutorizacionService,private router: Router, private _snackBar: MatSnackBar) { }

  onSubmit(): void {
    this.autorizacionService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.error = '';
        this.router.navigate(['/panel-interno']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }
  mostrarSnackBar(mensaje: string): void {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
    });
  }
}
