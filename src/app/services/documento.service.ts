import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Documento } from '../models/documento.model';
import { Factura } from '../models/factura.model';

@Injectable({
  providedIn: 'root'
})

export class DocumentoService{

  constructor(private http: HttpClient){}

  // Por id de trabajador

  obtenerDocumentoPorId(id: number): Observable<Documento[]> {
    return this.http.get<any>(`https://dyvim.site/documents?linkTo=id_employee_document&equalTo=${id}&select=*`)
      .pipe(
        map(response => {
          const results = response.results;
          if (results && results.length > 0) {
            return results.map((documento: any) => ({
            id: documento.id_document,
            nombre: documento.document_name,
            fechaSubida: documento.due_date,
            url: documento.attachment_url,
            }));
          } else {
        return [];
      }
    })
    );
  }


  //Por id de proveedor

  obtenerFacturaPorId(id: number): Observable<Factura[]> {
    return this.http.get<any[]>(`https://dyvim.site/documents?linkTo=id_supplier&equalTo=${id}&select=*`)
      .pipe(
        map((response: any) => {
          console.log('Respuesta de la API:', response);
          const results = response.results; // Obtener el array de resultados
          if (results && results.length > 0) {
            return results.map((factura: any) => ({
              id: factura.id_document,
              nombreDocumento: factura.document_name,
              fechaSubida: factura.due_date,
              tipo: factura.type,
              url: factura.attachment_url,
              pagada : factura.paid,
              numFactura: factura.num_invoice
            } as Factura));
          } else {
            throw new Error('No se encontraron resultados para el proveedor.');
          }
        })
      );
  }

  buscarPorNombre(nombre: string): Observable<Documento[]>{
    return this.http.get<any>(`https://dyvim.site/documents?linkTo=document_name&search=${nombre}&select=*`)
      .pipe(
      map(response => {
      if (response && response.results) {
        return response.results.map((documento: any) => ({
          id: documento.id_document,
          nombre: documento.document_name,
          fechaSubida: documento.due_date,
          url: documento.attachment_url,
        }));
      } else {
        return [];
      }
    })
  );
  }


  convertirDocumentoBD(documento: any): any {
    return {
      id_employee_document: documento.id,
      attachment_url: documento.url,
      due_date: documento.fechaSubida,
      document_name: documento.nombre,
    };
  }

  //Registro documento nuevo

  registrarDocumento(documento: any): Observable<any> {
    const data = this.convertirDocumentoBD(documento);
    console.log(data);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let params = new HttpParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params = params.set(key, data[key]);
      }
    }

    return this.http.post<any>('https://dyvim.site/documents', params.toString(), { headers });
  }

  subirArchivo(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', file);  // 'archivo' es el nombre del campo que el servidor espera

    return this.http.post(`https://dyvim.site/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // Actualizar documento

  actualizarDocumento(id: number, valor: string): Observable<any> {
    // Configura la URL con el parámetro id directamente en la URL
    const url = `https://dyvim.site/documents?id=${id}&nameId=id`;
    let body = new HttpParams()
      .set('attachment_url', valor);
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.put(url, body.toString(), { headers })
      .pipe(
        catchError(error => {
          console.error('Error al actualizar el documento:', error);
          return throwError(() => new Error('Error al actualizar, por favor intenta de nuevo más tarde'));
        })
      );
  }
}







