import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ResenaService } from 'src/app/services/resena.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.scss']
})
export class PerfilEmpresaComponent implements OnInit {

  empresa: any = '';
  empleados: any = '';
  servicios: any = '';
  resenas: any = '';
  usuarios: any = '';
  color: any = '#2883e9';
  color2: any = '#2883e9';

  constructor(private empresaService: EmpresaService, private servicioService: ServicioService, private empleadoService: EmpleadoService, 
    private resenaService: ResenaService, private authService: AuthService) { }

  ngOnInit(): void {
    this.obtenerEmpresa();
    this.obtenerEmpleados();
    this.obtenerServicios();
    this.obtenerResenas();
  }

  obtenerEmpresa() {
    this.empresaService.getEmpresa(JSON.parse(localStorage.getItem('usuario')!).email).subscribe(data => {
      this.empresa = data;
      this.personalizarEmpresa();
      console.log(this.empresa)
    }, error => {
      console.log(error);
    })
  }

  personalizarEmpresa() {
    let tarjeta = document.getElementById('banner');
    (tarjeta as HTMLElement).style.backgroundColor = '#'+this.empresa.color;
  }

  obtenerEmpleados() {
    this.empleadoService.getEmpleados(JSON.parse(localStorage.getItem('usuario')!).email).subscribe(data => {
      this.empleados = data;
      console.log(this.empleados)
    }, error => {
      console.log(error);
    })
  }

  obtenerServicios() {
    this.servicioService.getServicios(JSON.parse(localStorage.getItem('usuario')!).email).subscribe(data => {
      this.servicios = data;
      console.log(this.servicios)
    }, error => {
      console.log(error);
    })
  }

  obtenerResenas() {
    let empresa = '';
    if(JSON.parse(localStorage.getItem('usuario')!).tipo == 1)
      empresa = JSON.parse(localStorage.getItem('usuario')!).cif;
    else {
      empresa = '';
    }

    this.resenaService.getResenas(empresa).subscribe(data => {
      this.resenas = data[0];
      this.usuarios = data[1]
      console.log(this.resenas)
    }, error => {
      console.log(error);
    })
  }

crearServicio() {
  let newServicio = {
    "email" : JSON.parse(localStorage.getItem('usuario')!).email,
    "nombre" : (document.getElementById('nombre')! as HTMLInputElement).value,
    "color" : this.color
  }

  this.servicioService.postServicio(newServicio);
  
}

crearEmpleado() {
  let newEmpleado = {
    "email" : JSON.parse(localStorage.getItem('usuario')!).email,
    "nombre" : (document.getElementById('nombre2')! as HTMLInputElement).value,
    "color" : this.color2
  }

  this.empleadoService.postEmpleado(newEmpleado);
}

}
