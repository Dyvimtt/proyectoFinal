import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Factura } from '../models/factura.model';

@Injectable({
  providedIn: 'root'
})

export class FacturaService{

  constructor(private http: HttpClient){}


  convertirFacturaBD(factura: any): any {
    return {
      id_supplier: factura.proveedor,
      type: factura.tipo,
      paid: factura.estado,
      document_name: factura.nombre,
      budget_documents: factura.importe,
      due_date: factura.fechaSubida,
      num_invoice: factura.numeroFactura,
      attachment_url: ''
    };
  }

  //Registro factura nueva

  registrarFactura(factura: any): Observable<any> {
    const data = this.convertirFacturaBD(factura);
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

  // Usado para buscar facturas por id de proveedor

  obtenerFacturaPorId(id: number): Observable<Factura[]> {
    return this.http.get<any[]>(`https://dyvim.site/documents?linkTo=id_supplier_document&equalTo=${id}&select=*`)
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
              importe: factura.budget_documents,
              numFactura: factura.num_invoice
            } as Factura));
          } else {
            throw new Error('No se encontraron resultados para el proveedor.');
          }
        })
      );
  }

  //Busqueda por id de proyecto

  obtenerFacturaPorIdProyecto(id: number): Observable<Factura[]> {
    return this.http.get<any[]>(`https://dyvim.site/documents?linkTo=id_project_document&equalTo=${id}&select=*`)
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
              importe: factura.budget_documents,
              numFactura: factura.num_invoice
            } as Factura));
          } else {
            throw new Error('No se encontraron resultados para el proveedor.');
          }
        })
      );
  }
  // Obtener todas las facturas

  buscarTodosLasFacturas(): Observable<Factura[]>{
    return this.http.get<any>('https://dyvim.site/documents?linkTo=type&equalTo=Factura&select=*')
      .pipe(
        map(response => {
          if (response && response.results) {
              return response.results.map((factura: any) => ({
                id: factura.id_document,
                nombreDocumento: factura.document_name,
                fechaSubida: factura.due_date,
                tipo: factura.type,
                url: factura.attachment_url,
                pagada : factura.paid,
                importe: factura.budget_documents,
                numFactura: factura.num_invoice,
                id_proveedor: factura.id_supplier_document,
                id_proyecto: factura.id_project_document
              }));
          } else {
          throw new Error('No se encontraron empleados.');
        }
      })
    );
  }
  buscarTodosLosIngresos(): Observable<Factura[]>{
    return this.http.get<any>('https://dyvim.site/documents?linkTo=type&equalTo=Ingreso&select=*')
      .pipe(
        map(response => {
          if (response && response.results) {
              return response.results.map((factura: any) => ({
                id: factura.id_document,
                nombreDocumento: factura.document_name,
                fechaSubida: factura.due_date,
                tipo: factura.type,
                url: factura.attachment_url,
                pagada : factura.paid,
                importe: factura.budget_documents,
                numFactura: factura.num_invoice,
                id_proveedor: factura.id_supplier_document,
                id_proyecto: factura.id_project_document
              }));
          } else {
          throw new Error('No se encontraron empleados.');
        }
      })
    );
  }

  //Obtener facturas por nombre de proveedor

  obtenerFacturaPorNombreProveedor(name: string): Observable<Factura[]> {
    return this.http.get<any[]>(`https://dyvim.site/relations?rel=documents,suppliers&type=document,supplier&select=*&linkTo=name&search=${name}`)
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
              importe: factura.budget_documents,
              numFactura: factura.num_invoice,
              id_proveedor: factura.id_supplier_document,
              id_proyecto: factura.id_project_document
            } as Factura));
          } else {
            throw new Error('No se encontraron resultados para el proveedor.');
          }
        })
      );
  }

  //Obtener facturas por nombre de proyecto

  obtenerFacturaPorNombreProyecto(name: string): Observable<Factura[]> {
    return this.http.get<any[]>(`https://dyvim.site/relations?rel=documents,projects&type=document,project&select=*&linkTo=name&search=${name}`)
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
              importe: factura.budget_documents,
              numFactura: factura.num_invoice,
              id_proveedor: factura.id_supplier_document,
              id_proyecto: factura.id_project_document
            } as Factura));
          } else {
            throw new Error('No se encontraron resultados para el proveedor.');
          }
        })
      );
  }

  //Buscar todas las facturas orden descentente por fecha

  buscarFacturasPorFechaDesc(): Observable<Factura[]>{
    return this.http.get<any>('https://dyvim.site/documents?linkTo=type&equalTo=Factura&select=*&orderBy=due_date&orderMode=DESC')
      .pipe(
        map(response => {
          if (response && response.results) {
              return response.results.map((factura: any) => ({
                id: factura.id_document,
                nombreDocumento: factura.document_name,
                fechaSubida: factura.due_date,
                tipo: factura.type,
                url: factura.attachment_url,
                pagada : factura.paid,
                importe: factura.budget_documents,
                numFactura: factura.num_invoice,
                id_proveedor: factura.id_supplier_document,
                id_proyecto: factura.id_project_document
              }));
          } else {
          throw new Error('No se encontraron empleados.');
        }
      })
    );
  }

  //Buscar todas las facturas orden ascendente por fecha

  buscarFacturasPorFechaAsc(): Observable<Factura[]>{
    return this.http.get<any>('https://dyvim.site/documents?linkTo=type&equalTo=Factura&select=*&orderBy=due_date&orderMode=ASC')
      .pipe(
        map(response => {
          if (response && response.results) {
              return response.results.map((factura: any) => ({
                id: factura.id_document,
                nombreDocumento: factura.document_name,
                fechaSubida: factura.due_date,
                tipo: factura.type,
                url: factura.attachment_url,
                pagada : factura.paid,
                importe: factura.budget_documents,
                numFactura: factura.num_invoice,
                id_proveedor: factura.id_supplier_document,
                id_proyecto: factura.id_project_document
              }));
          } else {
          throw new Error('No se encontraron empleados.');
        }
      })
    );
  }
}
