import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/loginResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const params = new URLSearchParams();
    params.set('email_employee', email);
    params.set('password_employee', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<LoginResponse>(`https://dyvim.site/employees?login=true&suffix=employee`, params.toString(), { headers }).pipe(
      tap(response => {
        if (response.results.length > 0 && response.results[0].token_employee) {
          localStorage.setItem('userToken', response.results[0].token_employee);
          localStorage.setItem('userData', JSON.stringify({
            id: response.results[0].id_employee,
            email: response.results[0].email_employee
          }));
          console.log('Contenido de userToken:', localStorage.getItem('userToken'));
          console.log('Contenido de userData:', localStorage.getItem('userData'));
        }
      })
    );
  }


  estaLogueado(): boolean {
    return !!localStorage.getItem('userToken');
  }
}
