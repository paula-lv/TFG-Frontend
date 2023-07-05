import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RecuperarComponent } from './pages/auth/recuperar/recuperar.component';
import { RegistroComponent } from './pages/auth/registro/registro.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PerfilEmpresaComponent } from './pages/empresa/perfil-empresa/perfil-empresa.component';
import { PerfilUsuarioComponent } from './pages/usuario/perfil-usuario/perfil-usuario.component';
import { CalendarioEmpresaComponent } from './pages/empresa/calendario-empresa/calendario-empresa.component';
import { CalendarioUsuarioComponent } from './pages/usuario/calendario-usuario/calendario-usuario.component';
import { EmpleadosComponent } from './pages/empresa/empleados/empleados.component';
import { ResenaComponent } from './shared/resena/resena.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: '', component: InicioComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'nosotros', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'tuPerfil', component: PerfilEmpresaComponent },
  { path: 'miPerfil', component: PerfilUsuarioComponent },
  { path: 'tuCalendario', component: CalendarioEmpresaComponent },
  { path: 'miCalendario', component: CalendarioUsuarioComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'opiniones', component: ResenaComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

