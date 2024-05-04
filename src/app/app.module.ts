import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetalleProveedorComponent } from './detalle-proveedor/detalle-proveedor.component';
import { DetalleProyectoComponent } from './detalle-proyecto/detalle-proyecto.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { GeneralFacturasComponent } from './general-facturas/general-facturas.component';
import { GeneralProveedorComponent } from './general-proveedor/general-proveedor.component';
import { GeneralProyectoComponent } from './general-proyecto/general-proyecto.component';
import { GeneralTrabajadorComponent } from './general-trabajador/general-trabajador.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { PanelInternoComponent } from './panel-interno/panel-interno.component';
import { RegFacturaComponent } from './reg-factura/reg-factura.component';
import { RegProveedorComponent } from './reg-proveedor/reg-proveedor.component';
import { RegProyectoComponent } from './reg-proyecto/reg-proyecto.component';
import { RegTrabajadorComponent } from './reg-trabajador/reg-trabajador.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { GeneralInicioComponent } from './general-inicio/general-inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PanelInternoComponent,
    LoginComponent,
    RegFacturaComponent,
    RegProyectoComponent,
    RegTrabajadorComponent,
    DetalleUsuarioComponent,
    RegProveedorComponent,
    DetalleProveedorComponent,
    DetalleProyectoComponent,
    GeneralTrabajadorComponent,
    GeneralProveedorComponent,
    GeneralFacturasComponent,
    GeneralProyectoComponent,
    GeneralInicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
