import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Factura } from '../models/factura.model';
import { FacturaService } from '../services/factura.service';

@Component({
  selector: 'app-general-facturas',
  templateUrl: './general-facturas.component.html',
  styleUrls: ['./general-facturas.component.css']
})
export class GeneralFacturasComponent implements OnInit {
  facturas: Factura[] = [];
  facturasFiltradas: Factura[] = [];
  filtroSeleccionado: string = '';
  filtroTexto: string = '';

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.cargarFacturas();
  }

  cargarFacturas(): void {
    this.facturaService.buscarTodosLasFacturas().subscribe(
      facturas => this.facturasFiltradas = this.facturas = facturas,
      error => console.error('Error al cargar las facturas:', error)
    );
  }

  cambiarFiltro(): void {
    if (this.filtroSeleccionado === 'proveedor' || this.filtroSeleccionado === 'proyecto') {
      this.filtroTexto = '';
    } else {
      this.aplicarFiltroNoDinamico();
    }
  }

  buscarPorFiltro(): void {
    if (this.filtroTexto.trim()) {
      if (this.filtroSeleccionado === 'proveedor') {
        this.facturaService.obtenerFacturaPorNombreProveedor(this.filtroTexto).subscribe(
          facturas => this.facturasFiltradas = facturas,
          error => console.error('Error al buscar facturas:', error)
        );
      } else if (this.filtroSeleccionado === 'proyecto') {
        this.facturaService.obtenerFacturaPorNombreProyecto(this.filtroTexto).subscribe(
          facturas => this.facturasFiltradas = facturas,
          error => console.error('Error al buscar facturas:', error)
        );
      }
    } else {
      this.facturasFiltradas = this.facturas;
    }
  }

  aplicarFiltroNoDinamico(): void {
    switch (this.filtroSeleccionado) {
      case 'antiguas':
        this.facturaService.buscarFacturasPorFechaAsc().pipe(
          map(facturas => facturas.filter(factura => factura.pagada == "false"))
        ).subscribe(
          facturas => this.facturasFiltradas = facturas,
          error => console.error('Error al buscar facturas:', error)
        );
        break;
      case 'ingresos':
        this.facturaService.buscarTodosLosIngresos().subscribe(
          facturas => this.facturasFiltradas = facturas,
          error => console.error('Error al buscar ingresos:', error)
        );
        break;
      case 'recientes':
        this.facturaService.buscarFacturasPorFechaDesc().subscribe(
          facturas => this.facturasFiltradas = facturas,
          error => console.error('Error al buscar facturas:', error)
        );
        break;
    }
  }
}
