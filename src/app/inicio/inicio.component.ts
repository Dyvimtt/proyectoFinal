import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactoService } from '../services/contacto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  isMenuOpen = false;
  activeSectionId: string | null = null;
  mensaje: string | null = null;
  mensajeTipo: 'exito' | 'error' | null = null;

  constructor(private contactoService: ContactoService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 0);
      this.closeMenu();
    }
  }

  enviarMensaje(form: NgForm) {
    if (form.valid) {
      this.contactoService.enviarMensaje(form.value).subscribe(
        response => {
          if (response.success) {
            this.mensaje = 'Mensaje enviado con éxito';
            this.mensajeTipo = 'exito';
            form.reset();
          } else {
            this.mensaje = 'Error al enviar el mensaje';
            this.mensajeTipo = 'error';
          }
          this.limpiarMensaje();
        },
        error => {
          this.mensaje = 'Error al enviar el mensaje';
          this.mensajeTipo = 'error';
          this.limpiarMensaje();
        }
      );
    }
  }

  limpiarMensaje() {
    setTimeout(() => {
      this.mensaje = null;
      this.mensajeTipo = null;
    }, 3000);
  }
}


