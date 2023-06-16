import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { AuthService } from 'src/app/services/auth.service';

@NgModule({
  declarations: [LoginComponent, RegistroComponent, RecuperarComponent],
  imports: [
    CommonModule,
    FormsModule, 
    HttpClientModule,
  ],
  providers:[AuthService]
})
export class AuthModule { }
