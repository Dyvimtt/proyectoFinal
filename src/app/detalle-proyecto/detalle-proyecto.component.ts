import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Factura } from '../models/factura.model';
import { Proyecto } from '../models/proyecto.model';
import { FacturaService } from '../services/factura.service';
import { ProyectoService } from '../services/proyecto.service';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css']
})
export class DetalleProyectoComponent implements OnInit {
  proyectoId: number = 0;
  proyecto: Proyecto;
  facturas: Factura[] = [];
  balanceActual: number = 0;

  constructor(private route: ActivatedRoute, private proyectoService: ProyectoService, private facturaService: FacturaService) {
    this.proyecto = new Proyecto();
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.proyectoId = +params['id'];
      if (this.proyectoId) {
        this.proyectoService.obtenerProyectoPorId(this.proyectoId).subscribe(
          (proyecto) => {
            this.proyecto = proyecto;
            console.log('Detalles del proyecto:', proyecto);
            this.obtenerFacturasDelProyecto();
          },
          (error) => {
            console.error('Error al obtener el proyecto:', error);
          }
        );
      } else {
        console.error('No se proporcionó un ID de proyecto válido.');
      }
    });
  }

  obtenerFacturasDelProyecto(): void {
    this.facturaService.obtenerFacturaPorIdProyecto(this.proyectoId).subscribe(
      (facturas) => {
        this.facturas = facturas;
        console.log('Facturas del proyecto:', facturas);

        this.calcularBalanceActual();
      },
      (error) => {
        console.error('Error al obtener las facturas del proyecto:', error);
      }
    );
  }

  calcularBalanceActual(): void {
    const importes = this.facturas.map(factura => parseFloat(factura.importe));
    const totalFacturas = importes.reduce((acc, curr) => acc + curr, 0);
    const presupuestoNumero = parseFloat(this.proyecto.presupuesto);
    this.balanceActual = presupuestoNumero - totalFacturas;
  }
}
