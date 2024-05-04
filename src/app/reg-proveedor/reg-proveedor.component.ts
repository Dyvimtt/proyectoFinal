import { Component } from '@angular/core';
import { Proveedor } from '../models/proveedor.model';
import { ProveedorService } from '../services/proveedor.service';

@Component({
  selector: 'app-reg-proveedor',
  templateUrl: './reg-proveedor.component.html',
  styleUrl: './reg-proveedor.component.css'
})
export class RegProveedorComponent {
    proveedor: Proveedor = {
      nombre: '',
      cif: '',
      telefono: '',
      email: '',
      id_proveedor: 0
    };

    constructor(private proveedorService: ProveedorService) { }

    submitForm(): void {
      this.proveedorService.registrarProveedor(this.proveedor).subscribe(
        (response) => {
          console.log('Proveedor añadido correctamente:', response);
        },
        (error) => {
          console.error('Error al añadir proveedor:', error);
        }
      );
    }

}
