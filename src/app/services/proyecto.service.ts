import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Proyecto } from '../models/proyecto.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private http: HttpClient) { }

  obtenerProyectoPorId(id: number): Observable<Proyecto> {
    return this.http.get<any>(`https://dyvim.site/projects?linkTo=id_project&equalTo=${id}&select=*`)
      .pipe(
        map(response => {
          if (response && response.results && response.results.length > 0) {
            const resultado = response.results[0];
            console.log(resultado);
            return {
              id: id,
              nombre:resultado.name ,
              ciudad: resultado.city,
              presupuesto: resultado.budget,
              fechaInicio: resultado.start_date,
              fechaFinal: resultado.end_date
            };
          } else {
            throw new Error('No se encontraron resultados de este proyecto.');
          }
        })
      );
  }

  // Creamos una función para convertir los atributos de nuestro objeto a los nombres de las tablas de la BD
  convertirProyectoBD(proyecto: any): any {

    return {
      name: proyecto.nombre,
      city: proyecto.ciudad,
      budget: proyecto.presupuesto,
      start_date: proyecto.fechaInicio,
      end_date: proyecto.fechaFinal
    };
  }

  // Enviamos los datos con HttpHeaders ya que la api espera recibir los datos en formato x-www-form-urlencoded
  registrarProyecto(proyecto: any): Observable<any> {
    const data = this.convertirProyectoBD(proyecto);
    console.log(data);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    let params = new HttpParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params = params.set(key, data[key]);
      }
    }

    return this.http.post<any>('https://dyvim.site/projects', params.toString(), { headers });
  }

  //Obtener todos los proyectos

  obtenerTodosLosProyectos(): Observable<any[]> {
    console.log('Enviando solicitud HTTP para obtener todos los proveedores.');
    return this.http.get<any[]>('https://dyvim.site/projects?select=*')
      .pipe(
        map((response: any) => {
          console.log('Datos de proyectos recibidos del servidor:', response);
          const proyectos = response.results;
          if (Array.isArray(proyectos)) {
            return proyectos.map(proyecto => ({
              nombre: proyecto.name,
              ciudad: proyecto.city,
              presupuesto: proyecto.budget,
              fechaInicio: proyecto.start_date,
              fechaFinal: proyecto.end_date,
              id: proyecto.id_project
            }));
          } else {
            console.error('La respuesta del servidor no contiene el array "results":', response);
            return [];
          }
        })
      );
  }

  buscarProyectoPorNombre(nombre: string): Observable<Proyecto[]>{
    return this.http.get<any>(`https://dyvim.site/projects?linkTo=name&search=${nombre}&select=*`)
      .pipe(
      map(response => {
      if (response && response.results) {
        return response.results.map((proyecto: any) => ({
          nombre: proyecto.name,
          ciudad: proyecto.city,
          presupuesto: proyecto.budget,
          fechaInicio: proyecto.start_date,
          fechaFinal: proyecto.end_date,
          id: proyecto.id_project
        }));
      } else {
        return [];
      }
    })
  );
  }
}
