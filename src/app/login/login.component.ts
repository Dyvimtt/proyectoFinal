import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor() { }

  onSubmit(): void {
    // Aquí puedes agregar la lógica para autenticar al usuario
    // Por ahora, simplemente imprimiremos los datos en la consola
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
}
