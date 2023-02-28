import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario/perfil-usuario.component';
import { CalendarioUsuarioComponent } from './calendario-usuario/calendario-usuario/calendario-usuario.component';
import { UsuarioComponent } from './usuario.component';
import { Routes, RouterModule } from '@angular/router';
import { CitasComponent } from './citas/citas.component';
import { ListadoCitasComponent } from './listado-citas/listado-citas.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    children: [
      {
        path: 'perfil',
        component: PerfilUsuarioComponent,
      },
      {
        path: 'calendario',
        component: CalendarioUsuarioComponent,
      },
    ]
  },
];

@NgModule({
  declarations: [
    UsuarioComponent,
    CalendarioUsuarioComponent,
    PerfilUsuarioComponent,
    UsuarioComponent,
    CitasComponent,
    ListadoCitasComponent,
  ],
  imports: [
    
    CommonModule,
    RouterModule.forRoot([
      {path: 'usuario-perfil', component: PerfilUsuarioComponent},
      {path: 'usuario-calendario', component: CalendarioUsuarioComponent},
    ])
  ]
})
export class UsuarioModule { }
