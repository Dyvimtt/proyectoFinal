import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
}





