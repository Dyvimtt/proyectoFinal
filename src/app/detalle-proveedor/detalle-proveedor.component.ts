import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Factura } from '../models/factura.model';
import { Proveedor } from '../models/proveedor.model';
import { FacturaService } from '../services/factura.service';
import { ProveedorService } from '../services/proveedor.service';

@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.component.html',
  styleUrls: ['./detalle-proveedor.component.css'] // Modifiqué "styleUrl" a "styleUrls"
})
export class DetalleProveedorComponent implements OnInit {
  proveedor: Proveedor;
  facturas: Factura[] = [];
  facturasPagadas: Factura[] = [];
  facturasPorPagar: Factura[] = [];

  constructor(private proveedorService: ProveedorService, private facturaService: FacturaService, private route: ActivatedRoute) {
    this.proveedor = {
      nombre: '',
      cif:  '',
      telefono:  '',
      email:  '',
      id_proveedor: 0
    };
    this.facturas = [];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const proveedorId = +idParam; // Convertimos el parámetro de ruta a un número
        this.cargarDetallesProveedor(proveedorId);
      } else {
        console.error('No se proporcionó un ID de proveedor válido.');
      }
    });
  }

  private cargarDetallesProveedor(proveedorId: number): void {
    this.proveedorService.obtenerProveedorPorId(proveedorId).subscribe(
      proveedor => {
        this.proveedor = proveedor;
        console.log('Detalles del proveedor:', proveedor);
        this.cargarDocumentosConRetraso(proveedorId);
      },
      error => {
        console.error('Error al obtener el proveedor:', error);
      }
    );
  }

  cargarDocumentosConRetraso(proveedorId: number): void {
    this.facturaService.obtenerFacturaPorId(proveedorId).pipe(
      delay(500)
    ).subscribe(
      (facturas) => {
        this.facturas = facturas;
        console.log(facturas);
        this.facturasPagadas = facturas.filter(factura => factura.pagada === "1");
        this.facturasPorPagar = facturas.filter(factura => factura.pagada === "0");
        console.log('Facturas del proveedor:', this.facturas);
        console.log('Facturas pagadas:', this.facturasPagadas);
        console.log('Facturas por pagar:', this.facturasPorPagar);
      },
      error => {
        console.error('Error al obtener las facturas del proveedor:', error);
      }
    );
  }

  abrirFormularioAgregarFactura() {
    // Implementa la lógica para abrir el formulario de agregar factura aquí
  }
}
