import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<any>(`https://dyvim.site/employees?linkTo=id_employee&equalTo=${id}&select=*`)
      .pipe(
        map(response => {
          if (response && response.results && response.results.length > 0) {
            // Mapear los datos del primer resultado al objeto Usuario
            const resultado = response.results[0];
            console.log(resultado);
            return {
              id: id,
              nombre: resultado.first_name,
              apellido: resultado.second_name,
              dni: resultado.DNI,
              email: resultado.email_employee,
              telefono: resultado.phone,
              contrasena: '',
              rol: resultado.role,
              fechaRegistro: resultado.hire_date,
              url_photo: resultado.url_photo
            };
          } else {
            throw new Error('No se encontraron resultados para el usuario.');
          }
        })
      );
  }

  buscarTodosLosEmpleados(): Observable<Usuario[]>{
    return this.http.get<any>('https://dyvim.site/employees?select=*')
      .pipe(
        map(response => {
          if (response && response.results) {
              return response.results.map((usuario: any) => ({
              id: usuario.id_employee,
              nombre: usuario.first_name,
              apellido: usuario.second_name,
              dni: usuario.DNI,
              email: usuario.email_employee,
              telefono: usuario.phone,
              rol: usuario.role,
              fechaRegistro: usuario.hire_date,
              url_photo: usuario.url_photo

              }));
          } else {
          throw new Error('No se encontraron empleados.');
        }
      })
    );
  }



  // Creamos una función para convertir los atributos de nuestro objeto a los nombres de las tablas de la BD
  convertirTrabajadorBD(usuario: any): any {

    return {
      first_name: usuario.nombre,
      second_name: usuario.apellido,
      DNI: usuario.dni,
      email_employee: usuario.email,
      password_employee: usuario.contrasena,
      phone: usuario.telefono,
      role: 'employee',
      hire_date: usuario.fechaRegistro,
      url_photo: usuario.url_photo
    };
  }

  // Enviamos los datos con HttpHeaders ya que la api espera recibir los datos en formato x-www-form-urlencoded
  registrarTrabajador(usuario: any): Observable<any> {
    console.log(usuario);
    const data = this.convertirTrabajadorBD(usuario);
    console.log(data);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    let params = new HttpParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params = params.set(key, data[key]);
      }
    }

    return this.http.post<any>('https://dyvim.site/employees', params.toString(), { headers });
  }

  buscarPorNombre(nombre: string): Observable<Usuario[]>{
    return this.http.get<any>(`https://dyvim.site/employees?linkTo=first_name&search=${nombre}&select=*`)
      .pipe(
      map(response => {
      if (response && response.results) {
        return response.results.map((usuario: any) => ({
        id: usuario.id_employee,
        nombre: usuario.first_name,
        apellido: usuario.second_name,
        dni: usuario.DNI,
        email: usuario.email_employee,
        telefono: usuario.phone,
        contrasena: '',
        rol: usuario.role,
        fechaRegistro: usuario.hire_date
        }));
      } else {
        return [];
      }
    })
  );
  }
}

