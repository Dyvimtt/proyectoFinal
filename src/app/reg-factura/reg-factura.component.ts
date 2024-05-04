import { Component, OnInit } from '@angular/core';
import { Factura } from '../models/factura.model';
import { FacturaService } from '../services/factura.service';

@Component({
  selector: 'app-reg-factura',
  templateUrl: './reg-factura.component.html',
  styleUrls: ['./reg-factura.component.css']
})
export class RegFacturaComponent implements OnInit {

  numeroFactura: number = 0;
  nombre: string = '';
  importe: number = 0;
  proyecto: number = 0;
  estado: boolean = false;
  tipoTransaccion: string = 'Factura';
  proveedorId: number = 0;
  fecha: Date = new Date();

  // Registro factura
  factura: Factura = new Factura();

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
  }

  submitForm(): void {
    const factura = {
      numeroFactura: this.numeroFactura,
      proveedor: this.proveedorId,
      importe: this.importe,
      nombre: this.nombre,
      proyecto: this.proyecto,
      estado: this.estado,
      tipo: this.tipoTransaccion,
      fechaSubida: this.fecha
    };
    console.log('Datos de factura:', factura);
    this.facturaService.registrarFactura(factura).subscribe(
      (response) => {
        console.log('Factura añadida correctamente:', response);
      },
      (error) => {
        console.error('Error al añadir factura:', error);
      }
    );
  }
}
