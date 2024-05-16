import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Proveedor } from '../models/proveedor.model';
import { ProveedorService } from '../services/proveedor.service';

@Component({
  selector: 'app-reg-proveedor',
  templateUrl: './reg-proveedor.component.html',
  styleUrls: ['./reg-proveedor.component.css']
})
export class RegProveedorComponent {

  proveedor: Proveedor = new Proveedor();


  constructor(
    private proveedorService: ProveedorService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar)
   {}

   ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.proveedorService.obtenerProveedorPorId(+id).subscribe(
          (proveedor: Proveedor) => {
            this.proveedor = proveedor;
            this.mostrarSnackBar('Proveedor actualizado correctamente');
          },
          error => {
            console.error('Error al obtener los datos del proveedor:', error);
            this.mostrarSnackBar('Error al añadir proveedor');
            this.router.navigate(['/error']);
          }
        );
      }
    });
  }

  submitForm(myForm: NgForm): void {
    const { cif, telefono, email } = this.proveedor;
    if (!this.isValidCIF(cif ?? '')) {
      this.mostrarSnackBar('El CIF debe comenzar con una letra seguida de 8 números.');
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
    if (this.proveedor.id_proveedor) {
      this.proveedorService.actualizarProveedor(this.proveedor).subscribe(
        response => {
          console.log('Proveedor actualizado correctamente:', response);
          this.mostrarSnackBar('Proveedor actualizado correctamente');
        },
        error => {
          console.error('Error al actualizar proveedor:', error);
          this.mostrarSnackBar('Error al actualizar proveedor');
        }
      );
    } else {
      this.proveedorService.registrarProveedor(this.proveedor).subscribe(
        response => {
          console.log('Proveedor añadido correctamente:', response);
          this.mostrarSnackBar('Proveedor añadido correctamente');
          myForm.resetForm();
        },
        error => {
          console.error('Error al añadir proveedor:', error);
          this.mostrarSnackBar('Error al añadir proveedor');
        }
      );
    }
  }

  mostrarSnackBar(mensaje: string): void {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
    });
  }

  isValidCIF(cif: string): boolean {
    const cifRegex = /^[A-Za-z][0-9]{8}$/;
    return cifRegex.test(cif);
  }
  isValidTelefono(telefono: string): boolean {
    const telefonoRegex = /^[0-9]{9}$/;
    return telefonoRegex.test(telefono);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

