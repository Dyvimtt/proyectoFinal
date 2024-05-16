import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Documento } from '../models/documento.model';
import { Usuario } from '../models/usuario.model';
import { DocumentoService } from '../services/documento.service';
import { SubidaHttpService } from '../services/subidaHttp.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {
  usuario: Usuario;
  documentos: Documento[];

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private usuarioService: UsuarioService,
    private documentoService: DocumentoService,
    private subidaHttpService: SubidaHttpService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.usuario = {
      id: 0,
      nombre: '',
      apellido: '',
      dni: '',
      email: '',
      contrasena: '',
      telefono: '',
      rol: '',
      fechaRegistro: new Date(),
      url_photo: ''
    };
    this.documentos = [];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const usuarioId = +idParam;
        this.usuarioService.obtenerUsuarioPorId(usuarioId).subscribe(
          usuario => {
            this.usuario = usuario;
            this.cargarDocumentosConRetraso(usuarioId);
          },
          error => {
            console.error('Error al obtener el usuario:', error);
          }
        );
      } else {
        console.error('No se proporcionó un ID de usuario válido.');
      }
    });
  }

  cargarDocumentosConRetraso(usuarioId: number): void {
    this.documentoService.obtenerDocumentoPorId(usuarioId).pipe(
      delay(500)
    ).subscribe(
      (documentos) => {
        this.documentos = documentos;
        console.log('Documentos del usuario:', documentos);
      },
      (error) => {
        console.error('Error al obtener los documentos del usuario:', error);
      }
    );
  }

  seleccionarArchivo(): void {
    this.fileInput.nativeElement.click();
  }

  cambiarFoto(event: any): void {
    const archivo = event.target.files[0];
    if (archivo) {
      const extension = archivo.name.split('.').pop();
      const randomFilename = `foto_${new Date().getTime()}_${Math.floor(Math.random() * 10000)}.${extension}`;

      this.subidaHttpService.subirArchivo(archivo, randomFilename).subscribe(response => {
        if (response.type === HttpEventType.Response && response.body.success) {
          const nuevaUrl = `https://dyvim.site/documents/${response.body.filename}`;
          this.usuario.url_photo = nuevaUrl;
          this.usuarioService.actualizarTrabajador(this.usuario).subscribe(() => {
          }, error => {
            this._snackBar.open('Error al actualizar la foto', 'Cerrar', { duration: 3000 });
          });
        } else {
          this._snackBar.open('Subiendo la foto seleccionada', 'Cerrar', { duration: 3000 });
        }
      }, error => {
        console.error('Error al subir el archivo:', error);
        this._snackBar.open('Error al subir el archivo', 'Cerrar', { duration: 3000 });
      });
    }
  }
}
