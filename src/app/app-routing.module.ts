import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleProveedorComponent } from './detalle-proveedor/detalle-proveedor.component';
import { DetalleProyectoComponent } from './detalle-proyecto/detalle-proyecto.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { GeneralFacturasComponent } from './general-facturas/general-facturas.component';
import { GeneralInicioComponent } from './general-inicio/general-inicio.component';
import { GeneralProveedorComponent } from './general-proveedor/general-proveedor.component';
import { GeneralProyectoComponent } from './general-proyecto/general-proyecto.component';
import { GeneralTrabajadorComponent } from './general-trabajador/general-trabajador.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { PanelInternoComponent } from './panel-interno/panel-interno.component';
import { RegDocumentoComponent } from './reg-documento/reg-documento.component';
import { RegFacturaComponent } from './reg-factura/reg-factura.component';
import { RegProveedorComponent } from './reg-proveedor/reg-proveedor.component';
import { RegProyectoComponent } from './reg-proyecto/reg-proyecto.component';
import { RegTrabajadorComponent } from './reg-trabajador/reg-trabajador.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'panel-interno', component: PanelInternoComponent, canActivate: [AuthGuard], children: [
    { path: 'reg-trabajador', component: RegTrabajadorComponent },
    { path: 'reg-proyecto', component: RegProyectoComponent },
    { path: 'reg-proyecto/:id', component: RegProyectoComponent },
    { path: 'reg-factura', component: RegFacturaComponent },
    { path: 'reg-factura/:proveedorId',component: RegFacturaComponent},
    { path: 'mod-factura/:facturaId',component: RegFacturaComponent},
    { path: 'reg-proveedor', component: RegProveedorComponent },
    { path: 'reg-proveedor/:id', component: RegProveedorComponent },
    { path: 'reg-documento/:id', component: RegDocumentoComponent },
    { path: 'editar-trabajador/:id', component: RegTrabajadorComponent },
    { path: 'general-trabajador', component: GeneralTrabajadorComponent },
    { path: 'general-proveedor', component: GeneralProveedorComponent },
    { path: 'general-facturas' , component: GeneralFacturasComponent},
    { path: 'general-proyecto' , component: GeneralProyectoComponent},
    { path: 'general-inicio' , component: GeneralInicioComponent},
    { path: 'detalle-proveedor/:id', component: DetalleProveedorComponent },
    { path: 'detalle-usuario/:id', component: DetalleUsuarioComponent },
    { path: 'detalle-proyecto/:id', component: DetalleProyectoComponent },
    { path: '', redirectTo: 'general-inicio', pathMatch: 'full' },
  ]},
  { path: '', redirectTo: '/panel-interno', pathMatch: 'full' },
  { path: '**', redirectTo: '/panel-interno' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
