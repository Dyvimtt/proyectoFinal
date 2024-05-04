import { Component } from '@angular/core';
import { Proyecto } from '../models/proyecto.model';
import { ProyectoService } from '../services/proyecto.service';

@Component({
  selector: 'app-reg-proyecto',
  templateUrl: './reg-proyecto.component.html',
  styleUrl: './reg-proyecto.component.css'
})
export class RegProyectoComponent {

  nombre: string = "";
  ciudad: string = "";
  presupuesto: number = 0;
  fechaInicio: Date = new Date();
  fechaFinal: Date = new Date();

  proyecto: Proyecto = new Proyecto();

  constructor(private proyectoService: ProyectoService) { }

  submitForm() {
    const proyecto = {
      nombre: this.nombre,
      ciudad: this.ciudad,
      presupuesto: this.presupuesto,
      fechaInicio: this.fechaInicio,
      fechaFinal: this.fechaFinal
    };
    console.log(proyecto);
    this.proyectoService.registrarProyecto(proyecto).subscribe(
      (response) => {
        console.log('Proyecto añadido correctamente:', response);
      },
      (error) => {
        console.error('Error al añadir el proyecto:', error);
      }
    );
  }

}
