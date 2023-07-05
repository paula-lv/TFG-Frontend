import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './empresa.component';import { Routes, RouterModule } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';
import { PerfilEmpleadoComponent } from './perfil-empleado/perfil-empleado.component';
import { ResenaComponent } from './resena/resena.component';
import { OferasPromocionesComponent } from './oferas-promociones/oferas-promociones.component';
import { EventosComponent } from './eventos/eventos.component';
import { HistorialClientesComponent } from './historial-clientes/historial-clientes.component';
import { CalendarioEmpresaComponent } from './calendario-empresa/calendario-empresa.component';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '',
    component: EmpresaComponent,
    children: [
      {
        path: 'calendario',
        component: CalendarioEmpresaComponent,
      },
    ]
  },
];

@NgModule({
  declarations: [
    CalendarioEmpresaComponent,
    EmpresaComponent,
    EmpleadosComponent,
    PerfilEmpleadoComponent,
    ResenaComponent,
    OferasPromocionesComponent,
    EventosComponent,
    HistorialClientesComponent
  ],
  imports: [
    BrowserModule, CommonModule,
    RouterModule.forRoot([
      {path: 'empresa', component: EmpresaComponent},
      {path: 'empresa-calendario', component: CalendarioEmpresaComponent},
    ]),
  ]
})
export class EmpresaModule { }
