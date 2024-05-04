import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-general-trabajador',
  templateUrl: './general-trabajador.component.html',
  styleUrls: ['./general-trabajador.component.css']
})
export class GeneralTrabajadorComponent implements OnInit {
  nombreEmpleado: string = '';
  empleadoSeleccionado: number | null = null;
  empleados: Usuario[] = [];
  empleadosFiltrados: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
    this.cargarTodosEmpleados();
  }

  buscarEmpleadosPorNombre(): void {
    console.log(this.nombreEmpleado);
    if (this.nombreEmpleado.trim() !== '') {
      this.usuarioService.buscarPorNombre(this.nombreEmpleado).subscribe(
        empleados => {
          this.empleadosFiltrados = empleados;  // Actualiza solo la lista de empleados filtrados
        },
        error => {
          console.error('Error al buscar empleados:', error);
          this.empleadosFiltrados = [];  // Limpia la lista si hay un error
        }
      );
    } else {
      this.empleadosFiltrados = this.empleados;  // Restaura la lista completa si el campo de búsqueda está vacío
    }
  }

  seleccionarEmpleado(empleado: Usuario): void {
    this.empleadoSeleccionado = empleado.id;
    console.log('Empleado seleccionado:', empleado);
  }

  verEmpleado(): void {
    if (this.empleadoSeleccionado) {
      this.router.navigate(['/panel-interno/detalle-usuario', this.empleadoSeleccionado]);
    } else {
      console.error('No se ha seleccionado ningún empleado');
    }
  }

  cargarTodosEmpleados(): void {
    this.usuarioService.buscarTodosLosEmpleados().subscribe(
      empleados => {
        this.empleados = empleados;
        this.empleadosFiltrados = empleados;
      },
      error => {
        console.error('Error al cargar los empleados:', error);
      }
    );
  }
}
