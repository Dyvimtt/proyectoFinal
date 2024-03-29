import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PanelInternoComponent} from './panel-interno/panel-interno.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'panel-interno', component: PanelInternoComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
