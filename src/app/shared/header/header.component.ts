import { ExpressionBinding } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  opened = false;
  usuario = 0;
  cookie: any = '';

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void{
    do  {
      this.cookie = this.cookieService.get('tipo-usuario');

      if(this.cookie == 83648205) {
        environment.tipoUsuario = 1;
      } else if(this.cookie == 93847561) {
        environment.tipoUsuario = 0;
      } else if(this.cookie != "") {
        this.authService.logout();
      }
      this.usuario = environment.tipoUsuario;
      
    } while(this.cookie == '')
  }

  cerrarSesion() {
    this.authService.logout();
  }

}
