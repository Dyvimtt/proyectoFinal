import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from '../models/proyecto.model';
import { ProyectoService } from '../services/proyecto.service';

@Component({
  selector: 'app-reg-proyecto',
  templateUrl: './reg-proyecto.component.html',
  styleUrl: './reg-proyecto.component.css'
})
export class RegProyectoComponent implements OnInit {

  proyecto: Proyecto = new Proyecto();

  constructor(
    private proyectoService: ProyectoService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.proyectoService.obtenerProyectoPorId(+id).subscribe(
          (proyecto: Proyecto) => {
            this.proyecto = proyecto;
          },
          error => {
            console.error('Error al obtener los datos del proyecto:', error);
            this.mostrarSnackBar('Error al obtener los datos del proyecto');
          }
        );
      }
    });
  }

  submitForm(myForm: NgForm) {
    if (this.proyecto.id) {
      console.log(this.proyecto.id);
      // Es una modificación
      this.proyectoService.actualizarProyecto(this.proyecto).subscribe(
        response => this.mostrarSnackBar('Proyecto actualizado correctamente'),
        error => this.mostrarSnackBar('Hubo un error al actualizar el proyecto')
      );
    } else {
      // Es una creación
      this.proyectoService.registrarProyecto(this.proyecto).subscribe(
        response => {this.mostrarSnackBar('Proyecto registrado correctamente');
        myForm.resetForm();
        },
        error => this.mostrarSnackBar('Hubo un error al actualizar el proyecto')
      );
    }
  }

  mostrarSnackBar(mensaje: string): void {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
    });
  }

}
