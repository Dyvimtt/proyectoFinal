import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from '../models/proyecto.model';
import { ProyectoService } from '../services/proyecto.service';

@Component({
  selector: 'app-general-proyecto',
  templateUrl: './general-proyecto.component.html',
  styleUrls: ['./general-proyecto.component.css']
})
export class GeneralProyectoComponent implements OnInit {
  nombreProyecto: string = '';
  proyectoSeleccionado: number | null = null;
  proyectos: Proyecto[] = [];
  proyectosFiltrados: Proyecto[] = [];

  constructor(private proyectoService: ProyectoService, private router: Router) { }

  ngOnInit() {
    this.cargarTodosProyectos();
  }

  buscarProyectosPorNombre(): void {
    console.log(this.nombreProyecto);
    if (this.nombreProyecto.trim() !== '') {
      this.proyectoService.buscarProyectoPorNombre(this.nombreProyecto).subscribe(
        proyectos => {
          this.proyectosFiltrados = proyectos;
        },
        error => {
          console.error('Error al buscar proyectos:', error);
          this.proyectosFiltrados = [];
        }
      );
    } else {
      this.proyectosFiltrados = this.proyectos;
    }
  }

  seleccionarProyecto(proyecto: Proyecto): void {
    this.proyectoSeleccionado = proyecto.id;
  }

  verProyecto(): void {
    if (this.proyectoSeleccionado) {
      this.router.navigate(['/panel-interno/detalle-proyecto', this.proyectoSeleccionado]);
    } else {
      console.error('No se ha seleccionado ningún proyecto');
    }
  }

  cargarTodosProyectos(): void {
    this.proyectoService.obtenerTodosLosProyectos().subscribe(
      proyectos => {
        this.proyectos = proyectos;
        this.proyectosFiltrados = proyectos;
      },
      error => {
        console.error('Error al cargar los proyectos:', error);
      }
    );
  }
}
