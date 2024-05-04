import { Component } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';
@Component({
  selector: 'app-reg-trabajador',
  templateUrl: './reg-trabajador.component.html',
  styleUrls: ['./reg-trabajador.component.css']
})
export class RegTrabajadorComponent {

  nombre: string = '';
  apellido: string = '';
  dni: string = '';
  email: string = '';
  contrasena: string = '';
  telefono: string = '';
  rol: string = 'trabajador';
  fechaRegistro: Date = new Date();
  url_photo: string = ''; // Valor por defecto

  usuario: Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService) { }

  // Método para enviar el formulario
  submitForm(): void {
    // Inicializa el objeto usuario y asigna los valores de los ngModel
    this.usuario = {
      id: 0,
      nombre: this.nombre,
      apellido: this.apellido,
      dni: this.dni,
      email: this.email,
      contrasena: this.contrasena,
      telefono: this.telefono,
      rol: this.rol,
      fechaRegistro: this.fechaRegistro,
      url_photo: this.url_photo
    };
    console.log(this.usuario);
    // Llama al método para registrar el usuario
    this.usuarioService.registrarTrabajador(this.usuario).subscribe(
      (response) => {
        console.log('Trabajador añadido correctamente:', response);
      },
      (error) => {
        console.error('Error al añadir trabajador:', error);
      }
    );
  }
}
