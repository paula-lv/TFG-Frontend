import { ExpressionBinding } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  opened = false;
  usuario = environment.tipoUsuario;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
