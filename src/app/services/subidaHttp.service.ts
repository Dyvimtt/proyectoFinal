import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubidaHttpService {

  constructor(private http: HttpClient) { }

  subirArchivo(file: File, filename: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file, filename);  // Usar el nombre de archivo proporcionado

    const req = new HttpRequest('POST', 'https://dyvim.site/upload', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
