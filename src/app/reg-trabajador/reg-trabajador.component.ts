import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-reg-trabajador',
  templateUrl: './reg-trabajador.component.html',
  styleUrls: ['./reg-trabajador.component.css']
})
export class RegTrabajadorComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.usuarioService.obtenerUsuarioPorId(+id).subscribe(
          (usuario: Usuario) => {
            this.usuario = usuario;
          },
          error => {
            this.mostrarSnackBar('Error al obtener los datos del trabajador');
            this.router.navigate(['/error']);
          }
        );
      }
    });
  }

  submitForm(myForm: NgForm): void {
    const { dni, telefono, email, contrasena } = this.usuario;

    if (!this.isValidDNI(dni ?? '')) {
      this.mostrarSnackBar('El DNI debe tener 8 dígitos seguidos de una letra.');
      return;
    }

    if (!this.isValidTelefono(telefono ?? '')) {
      this.mostrarSnackBar('El teléfono debe contener solo números y tener 9 dígitos.');
      return;
    }

    if (!this.isValidEmail(email ?? '')) {
      this.mostrarSnackBar('Debe ser una dirección de correo electrónico válida.');
      return;
    }

    if (!this.usuario.id && !this.isValidContrasena(contrasena ?? '')) {
      this.mostrarSnackBar('La contraseña debe contener al menos una letra mayúscula, un número y tener al menos 8 caracteres.');
      return;
    }
    if (this.usuario.id) {
      this.usuarioService.actualizarTrabajador(this.usuario).subscribe(
        response => this.mostrarSnackBar('Trabajador actualizado con éxito.'),
        error => this.mostrarSnackBar('Error al actualizar el trabajador.')
      );
    } else {
      this.usuarioService.registrarTrabajador(this.usuario).subscribe(
        response => {this.mostrarSnackBar('Trabajador registrado con éxito.');
        myForm.resetForm();
        },
        error => this.mostrarSnackBar('Error al registrar el trabajador.')
      );
    }
  }

  mostrarSnackBar(mensaje: string): void {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
    });
  }

  isValidDNI(dni: string): boolean {
    const dniRegex = /^[0-9]{8}[A-Za-z]$/;
    return dniRegex.test(dni);
  }

  isValidTelefono(telefono: string): boolean {
    const telefonoRegex = /^[0-9]{9}$/;
    return telefonoRegex.test(telefono);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidContrasena(contrasena: string): boolean {
    const contrasenaRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return contrasenaRegex.test(contrasena);
  }

}
