import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DocumentoService } from '../services/documento.service';
import { SubidaHttpService } from '../services/subidaHttp.service';

@Component({
  selector: 'app-reg-documento',
  templateUrl: './reg-documento.component.html',
  styleUrls: ['./reg-documento.component.css']
})
export class RegDocumentoComponent implements OnInit {
  id: number = 0;
  nombre: string = "";
  fechaSubida: Date = new Date();
  url: string = "";
  archivoParaSubir: File | null = null;

  constructor(private documentoService: DocumentoService, private subidaHttpService: SubidaHttpService, private route: ActivatedRoute, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  manejarArchivoSeleccionado(event: any) {
    this.archivoParaSubir = event.target.files[0];
  }

  submitForm(myForm: NgForm): void {
    const documento = {
      id: this.id,
      nombre: this.nombre,
      fechaSubida: this.fechaSubida,
      url: 'https://dyvim.site/documents/generica.jpg'
    };

    if (this.archivoParaSubir) {
      const extension = this.archivoParaSubir.name.split('.').pop();
      const randomFilename = `doc_${new Date().getTime()}_${Math.floor(Math.random() * 10000)}.${extension}`;

      // Llamar al servicio pasando el archivo y el nombre de archivo aleatorio
      this.subidaHttpService.subirArchivo(this.archivoParaSubir, randomFilename).subscribe(event => {
        if (event.type === HttpEventType.Response) {
          const responseBody = event.body;
          if (responseBody.success) {
            console.log('Archivo subido con éxito:', responseBody.filename);
            documento.url = `https://dyvim.site/documents/${responseBody.filename}`;
            this.documentoService.registrarDocumento(documento).subscribe(response => {
              this.mostrarSnackBar('Documento creado correctamente');
              myForm.resetForm();
            }, error => this.mostrarSnackBar('Hubo un error al registrar el documento'));
          } else {
            this.mostrarSnackBar('Error al subir el archivo');
          }
        }
      }, error => console.error('Error al subir el archivo:', error));
    }
  }

  mostrarSnackBar(mensaje: string): void {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
    });
  }

}
