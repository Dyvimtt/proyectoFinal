import { HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from '../services/factura.service';
import { SubidaHttpService } from '../services/subidaHttp.service';

@Component({
  selector: 'app-reg-factura',
  templateUrl: './reg-factura.component.html',
  styleUrls: ['./reg-factura.component.css']
})
export class RegFacturaComponent implements OnInit {



  factura: any = {
    numeroFactura: null,
    nombre: '',
    importe: null,
    proyecto: null,
    tipo: 'Factura',
    proveedor: null,
    id: null,
    fechaSubida: new Date(),
    urlCaptura: null
  };


  constructor(private facturaService: FacturaService, private subidaHttpService: SubidaHttpService, private route: ActivatedRoute, private cdr: ChangeDetectorRef, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('proveedorId')) {
        const proveedorId = Number(params.get('proveedorId'));
        this.factura.proveedor = proveedorId;
      }
      if (params.has('facturaId')) {
        const facturaId = Number(params.get('facturaId'));
        this.facturaService.obtenerFacturaPorIdDocumento(facturaId).subscribe(
          (facturas: any[]) => {
            if (facturas.length > 0) {
              const factura = facturas[0]; // Obtener la primera factura
              this.factura = {
                id: facturaId,
                numeroFactura: factura.numFactura,
                nombre: factura.nombreDocumento,
                importe: factura.importe,
                proyecto: factura.id_proyecto,
                estado: factura.pagada ? 'true' : 'false',
                tipo: factura.tipo,
                proveedor: factura.id_proveedor,
                facturaId: factura.id,
                fechaSubida: factura.fechaSubida,
                urlCaptura: factura.url
              };
              console.log(this.factura);
            } else {
              this.mostrarSnackBar('No se encontró ningun factura para el ID proporcionado.');
            }
          },
          error => {
            this.mostrarSnackBar('Error al obtener la factura');
          }
        );
      }
    });
  }

  manejarArchivoSeleccionado(event: any) {
    this.factura.urlCaptura = event.target.files[0];
  }

  submitForm(myForm: NgForm): void {
    const facturaData = { ...this.factura };

    if (this.factura.facturaId) {
      this.actualizarFactura(facturaData);
    } else {
      if (facturaData.urlCaptura) {
        const extension = facturaData.urlCaptura.name.split('.').pop();
        const randomFilename = `img_${new Date().getTime()}_${Math.floor(Math.random() * 10000)}.${extension}`;

        this.subidaHttpService.subirArchivo(facturaData.urlCaptura, randomFilename).subscribe(event => {
          if (event.type === HttpEventType.Response) {
            console.log('Captura de factura subida con éxito:', event.body.filename);
            facturaData.urlCaptura = `https://dyvim.site/documents/${event.body.filename}`;
            this.registrarFactura(facturaData);
            this.mostrarSnackBar('La factura se ha registrado correctamente');
            myForm.resetForm();
          }
        }, error => {
          this.mostrarSnackBar('Error al subir la captura: ' + error); // Mostrar error en snackBar
        });
      } else {
        this.registrarFactura(facturaData);
        this.mostrarSnackBar('La factura se ha registrado correctamente');
        myForm.resetForm();
      }
    }
  }

  actualizarFactura(facturaData: any): void {
    this.facturaService.actualizarFactura(facturaData).subscribe(
      response => this.mostrarSnackBar('La factura se ha actualizado correctamente'),
      error => this.mostrarSnackBar('Hubo un error al actualizar la factura'),
    );
  }

  registrarFactura(facturaData: any): void {
    this.facturaService.registrarFactura(facturaData).subscribe(
      response => this.mostrarSnackBar('La factura se ha registrado correctamente'),
      error => this.mostrarSnackBar('Hubo un error al registrar la factura'),
    );
  }
  mostrarSnackBar(mensaje: string): void {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
    });
  }
}
