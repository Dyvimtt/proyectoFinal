import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  private apiUrl = 'https://dyvim.site/contact';

  constructor(private http: HttpClient) { }

  enviarMensaje(contactData: any): Observable<any> {
    return this.http.post(this.apiUrl, contactData);
  }
}
