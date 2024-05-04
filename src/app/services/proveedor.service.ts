import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Proveedor } from '../models/proveedor.model';

interface ProveedorResponse {
  status: number;
  total: number;
  results: { name: string; id_supplier: string; }[];
}

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }


  //Creamos una función para convertir los atributos de nuestro objeto a los nombres de las tablas de la BD

  convertirProveedorBD(proveedor: any): any {
    return {
      name: proveedor.nombre,
      email: proveedor.email,
      CIF: proveedor.cif,
      phone: proveedor.telefono
    };
  }

  // Enviamos los datos con HttpHeaders ya que la api espera recibir los datos en formato x-www-form-urlencoded

  registrarProveedor(proveedor: any): Observable<any> {
    const data = this.convertirProveedorBD(proveedor);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    let params = new HttpParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params = params.set(key, data[key]);
      }
    }

    return this.http.post<any>('https://dyvim.site/suppliers', params.toString(), { headers });
  }

  //Obtener proveedor por Id
  obtenerProveedorPorId(id: number): Observable<Proveedor> {
    return this.http.get<any>(`https://dyvim.site/suppliers?linkTo=id_supplier&equalTo=${id}&select=*`)
      .pipe(
        map(response => {
          if (response && response.results && response.results.length > 0) {
            // Mapear los datos del primer resultado al objeto proveedor
            const resultado = response.results[0];
            console.log(resultado);
            return {
              id: id,
              nombre: resultado.name,
              cif: resultado.CIF,
              telefono: resultado.phone,
              email: resultado.email,
              id_proveedor: resultado.id_supplier
            };
          } else {
            throw new Error('No se encontraron resultados para el usuario.');
          }
        })
      );
  }

  obtenerTodosLosProveedores(): Observable<any[]> {
    console.log('Enviando solicitud HTTP para obtener todos los proveedores.');
    return this.http.get<any[]>('https://dyvim.site/suppliers?select=*')
      .pipe(
        map((response: any) => {
          console.log('Datos de proveedores recibidos del servidor:', response);
          const proveedores = response.results; // Obtener el array de proveedores
          if (Array.isArray(proveedores)) {
            return proveedores.map(proveedor => ({
              nombre: proveedor.name,
              id_proveedor: proveedor.id_supplier,
              cif: proveedor.CIF,
              telefono: proveedor.phone,
              email: proveedor.email
            }));
          } else {
            console.error('La respuesta del servidor no contiene el array "results":', response);
            return [];
          }
        })
      );
  }
  buscarPorNombre(nombre: string): Observable<Proveedor[]>{
    return this.http.get<any>(`https://dyvim.site/suppliers?linkTo=name&search=${nombre}&select=*`)
      .pipe(
      map(response => {
      if (response && response.results) {
        return response.results.map((proveedor: any) => ({
          nombre: proveedor.name,
          cif: proveedor.CIF,
          telefono: proveedor.phone,
          email: proveedor.email,
          id_proveedor: proveedor.id_supplier
        }));
      } else {
        return [];
      }
    })
  );
  }

}
