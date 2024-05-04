import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedor } from '../models/proveedor.model';
import { ProveedorService } from '../services/proveedor.service';

@Component({
  selector: 'app-general-proveedor',
  templateUrl: './general-proveedor.component.html',
  styleUrls: ['./general-proveedor.component.css']
})
export class GeneralProveedorComponent implements OnInit {

  nombreProveedor: string = '';
  proveedorSeleccionado: number | null = null;
  proveedores: Proveedor[] = [];
  proveedoresFiltrados: Proveedor[] = [];

  constructor(private proveedorService: ProveedorService, private router: Router) { }

  ngOnInit() {
    this.cargarTodosLosProveedores();
  }

  buscarProveedoresPorNombre(): void {
    console.log(this.nombreProveedor);
    if (this.nombreProveedor.trim() !== '') {
      this.proveedorService.buscarPorNombre(this.nombreProveedor).subscribe(
        proveedores => {
          this.proveedoresFiltrados = proveedores;
        },
        error => {
          console.error('Error al buscar proveedores:', error);
          this.proveedoresFiltrados = [];
        }
      );
    } else {
      this.proveedoresFiltrados = this.proveedores;
    }
  }

  seleccionarProveedor(proveedor: Proveedor): void {
    this.proveedorSeleccionado = proveedor.id_proveedor;
    console.log('Proveedor seleccionado:', proveedor);
  }

  verProveedor(): void {
    if (this.proveedorSeleccionado) {
      this.router.navigate(['/panel-interno/detalle-proveedor', this.proveedorSeleccionado]);
    } else {
      console.error('No se ha seleccionado ningún proveedor');
    }
  }

  cargarTodosLosProveedores(): void {
    this.proveedorService.obtenerTodosLosProveedores().subscribe(
      proveedores => {
        this.proveedores = proveedores;
        this.proveedoresFiltrados = proveedores;
      },
      error => {
        console.error('Error al cargar los proveedores:', error);
      }
    );
  }

}
