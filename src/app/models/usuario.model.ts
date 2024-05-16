export class Usuario {
  id: number = 0;
  nombre?: string = "";
  apellido?: string = "";
  dni?: string = "";
  email?: string = "";
  contrasena?: string = "";
  telefono?: string = "";
  rol?: string = "";
  fechaRegistro?: Date = new Date();
  url_photo?: string = "";
}
