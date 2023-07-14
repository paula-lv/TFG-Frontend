import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { PerfilUsuarioComponent } from './pages/usuario/perfil-usuario/perfil-usuario.component';
import { CalendarioUsuarioComponent } from './pages/usuario/calendario-usuario/calendario-usuario.component';
import { PerfilEmpresaComponent } from './pages/empresa/perfil-empresa/perfil-empresa.component';
import { CitaListadoComponent } from './shared/cita-listado/cita-listado.component';
import { CitaDetalleComponent } from './shared/cita-detalle/cita-detalle.component';
import { ResenaComponent } from './shared/resena/resena.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistroComponent } from './pages/auth/registro/registro.component';
import { RecuperarComponent } from './pages/auth/recuperar/recuperar.component';
import { AuthService } from './services/auth.service';
import { EmpresaService } from './services/empresa.service';
import { EmpleadoService } from './services/empleado.service';
import { ServicioService } from './services/servicio.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ColorPickerModule } from 'ngx-color-picker';
import { ResenaService } from './services/resena.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarioEmpresaComponent } from './pages/empresa/calendario-empresa/calendario-empresa.component';

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

@Injectable()
export class CustomInterceptor implements HttpInterceptor { 
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        request = request.clone({
            withCredentials: true
        });
    
        return next.handle(request);
    }
}

@NgModule({
  declarations: [
    AppComponent,
    CitaListadoComponent,
    CitaDetalleComponent,
    ResenaComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    ContactoComponent,
    LoginComponent,
    RegistroComponent,
    RecuperarComponent,
    PerfilEmpresaComponent,
    CalendarioEmpresaComponent,
    CalendarioUsuarioComponent
  ],
  imports: [
    BrowserModule, ColorPickerModule, FullCalendarModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: 'usuario-perfil', component: PerfilUsuarioComponent},
      {path: 'usuario-calendario', component: CalendarioUsuarioComponent},
    ]),
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatSelectModule
  ],
  providers: [AuthService, EmpresaService, CookieService, EmpleadoService, ServicioService, ResenaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor ,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
