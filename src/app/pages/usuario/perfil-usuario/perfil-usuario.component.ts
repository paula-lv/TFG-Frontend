import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ResenaService } from 'src/app/services/resena.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(private empresaService: EmpresaService, private servicioService: ServicioService, private empleadoService: EmpleadoService, 
    private resenaService: ResenaService, private authService: AuthService) { }

  ngOnInit(): void {
  }

}
