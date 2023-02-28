import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PerfilUsuarioComponent } from './pages/usuario/perfil-usuario/perfil-usuario.component';
import { CalendarioUsuarioComponent } from './pages/usuario/calendario-usuario/calendario-usuario.component';
import { CitaListadoComponent } from './shared/cita-listado/cita-listado.component';
import { CitaDetalleComponent } from './shared/cita-detalle/cita-detalle.component';
import { ResenaComponent } from './shared/resena/resena.component';
import { InicioComponent } from './pages/inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'usuario',
        component: UsuarioComponent
      },
      {
        path: 'empresa',
        component: EmpresaComponent
      },
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CitaListadoComponent,
    CitaDetalleComponent,
    ResenaComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: 'usuario-perfil', component: PerfilUsuarioComponent},
      {path: 'usuario-calendario', component: CalendarioUsuarioComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
