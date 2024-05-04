import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Documento } from '../models/documento.model';
import { Usuario } from '../models/usuario.model';
import { DocumentoService } from '../services/documento.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {
  usuario: Usuario;
  documentos: Documento[];

  constructor(
    private usuarioService: UsuarioService,
    private documentoService: DocumentoService,
    private route: ActivatedRoute
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

  abrirFormularioAgregarDocumento() {}
}
