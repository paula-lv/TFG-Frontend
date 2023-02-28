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
import { PerfilEmpresaComponent } from './perfil-empresa/perfil-empresa.component';

const routes: Routes = [
  {
    path: '',
    component: EmpresaComponent,
    children: [
      {
        path: 'perfil',
        component: PerfilEmpresaComponent,
      },
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
    PerfilEmpresaComponent,
    EmpresaComponent,
    EmpleadosComponent,
    PerfilEmpleadoComponent,
    ResenaComponent,
    OferasPromocionesComponent,
    EventosComponent,
    HistorialClientesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: 'empresa', component: EmpresaComponent},
      {path: 'empresa-perfil', component: PerfilEmpresaComponent},
      {path: 'empresa-calendario', component: CalendarioEmpresaComponent},
    ]),
  ]
})
export class EmpresaModule { }
