import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { AuthService } from 'src/app/services/auth.service';
import { CitaService } from 'src/app/services/cita.service';

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
  color: any = '#9DC572';
  color2: any = '#9DC572';

  servicioEditar: any = '';


  empleado1 = {
    nombre: 'Laura',
    horario: 'L;Libre*M;08:30-14:00*X;09:00-18:30*J;08:30-14:00*V;10:00-14:00*S;Libre*D;Libre'
  }

  empleado2 = {
    nombre: 'Manuel',
    horario: 'L;Libre*M;16:00-20:00*X;09:00-18:30*J;16:00-20:00*V;10:00-14:00*S;Libre*D;Libre'
  }

  horario = 'L;Cerrado*M;08:30-14:00, 16:00-20:00*X;09:00-18:30*J;08:30-14:00, 16:00-20:00*V;10:00-14:00*S;Cerrado*D;Cerrado';

  empleado = this.empleado1;

  constructor(private empresaService: EmpresaService, private servicioService: ServicioService, private empleadoService: EmpleadoService, 
     private authService: AuthService, private citaService: CitaService) { }

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
    let iconos = document.getElementsByClassName('mat-iconPersonalizar');
    let botones = document.getElementsByClassName('buttonPersonalizar');
    for (let i = 0; i < iconos.length; i++) {
      (iconos[i] as HTMLElement).style.color = '#'+this.empresa.color;
    }

    for (let i = 0; i < botones.length; i++) {
      (botones[i] as HTMLElement).style.backgroundColor = '#'+this.empresa.color;
    }
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
    this.citaService.getResenas(JSON.parse(localStorage.getItem('usuario')!).email).subscribe(data => {
      this.resenas = data;
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

formatearFecha(fecha: String) { //2023-07-19T10:00:00.000Z
  let mes;
  let dividida = fecha.split('T') //2023-07-19, 10:00:00.000Z

  let fechaDividida = dividida[0].split('-'); // 2023, 07, 19
  let horaDividida = dividida[1].split(':'); //10, 00, 00.000Z

  switch (fechaDividida[1]) {
    case '01' : mes = 'Enero'; break;
    case '02' : mes = 'Febrero'; break;
    case '03' : mes = 'Marzo'; break;
    case '04' : mes = 'Abril'; break;
    case '05' : mes = 'Mayo'; break;
    case '06' : mes = 'Junio'; break;
    case '07' : mes = 'Julio'; break;
    case '08' : mes = 'Agosto'; break;
    case '09' : mes = 'Septiembre'; break;
    case '10' : mes = 'Octubre'; break;
    case '11' : mes = 'Noviembre'; break;
    case '12' : mes = 'Diciembre'; break;
  }
  let devuelve = fechaDividida[2] + ' de ' + mes + ' de ' + fechaDividida[0] + ', a las ' +  horaDividida[0] + ':' + horaDividida[1];
  return devuelve;
}

getHorario() { //L;09:00-18:30*M;08:30-14:00&16:00-20:00*X:09:00-18:30*J;08:30-14:00&16:00-20:00*V;10:00-14:00
  let horario = this.horario;
  let div = document.querySelector('#horario');
  div?.replaceChildren();
  let semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  
    let dias = horario.split('*') // L;09:00-18:30   //M;08:30-14:00&16:00-20:00   //X:09:00-18:30    //J;08:30-14:00&16:00-20:00    //V;10:00-14:00
    for(let j = 0; j < dias.length; j++) {
      //  Voy comprobando si abre todos los días o no
      let box = document.createElement("div");
      box.classList.add('col-4')
      box.innerText = /*dias[j].split(';')[0]*/ semana[j];
      div?.appendChild(box);
      let box2 = document.createElement('div');
      box2.classList.add('col-8');
      box2.innerText = dias[j].split(';')[1];
      div?.appendChild(box2);
    }
      
    
  return 0
}

getHorario1() { //L;09:00-18:30*M;08:30-14:00&16:00-20:00*X:09:00-18:30*J;08:30-14:00&16:00-20:00*V;10:00-14:00
  let horario = this.empleado1.horario;
  let div = document.querySelector('#horario1');
  div?.replaceChildren();
  let semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  
    let dias = horario.split('*') // L;09:00-18:30   //M;08:30-14:00&16:00-20:00   //X:09:00-18:30    //J;08:30-14:00&16:00-20:00    //V;10:00-14:00
    for(let j = 0; j < dias.length; j++) {
      //  Voy comprobando si abre todos los días o no
      let box = document.createElement("div");
      box.classList.add('col-6')
      box.innerText = /*dias[j].split(';')[0]*/ semana[j];
      div?.appendChild(box);
      let box2 = document.createElement('div');
      box2.classList.add('col-6');
      box2.innerText = dias[j].split(';')[1];
      div?.appendChild(box2);
    }
      
    
  return 0
}

getHorario2() { //L;09:00-18:30*M;08:30-14:00&16:00-20:00*X:09:00-18:30*J;08:30-14:00&16:00-20:00*V;10:00-14:00
  let horario = this.empleado2.horario;
  let div = document.querySelector('#horario2');
  div?.replaceChildren();
  let semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  
    let dias = horario.split('*') // L;09:00-18:30   //M;08:30-14:00&16:00-20:00   //X:09:00-18:30    //J;08:30-14:00&16:00-20:00    //V;10:00-14:00
    for(let j = 0; j < dias.length; j++) {
      //  Voy comprobando si abre todos los días o no
      let box = document.createElement("div");
      box.classList.add('col-6')
      box.innerText = /*dias[j].split(';')[0]*/ semana[j];
      div?.appendChild(box);
      let box2 = document.createElement('div');
      box2.classList.add('col-6');
      box2.innerText = dias[j].split(';')[1];
      div?.appendChild(box2);
    }
      
    
  return 0
}

editarEmpleado(i: number) {
   if(i == 1) {
    (document.getElementById('selectHora11') as HTMLInputElement).value = '08:30';
    (document.getElementById('selectHora12') as HTMLInputElement).value = '09:00';
    (document.getElementById('selectHora13') as HTMLInputElement).value = '08:30';
    (document.getElementById('selectHora14') as HTMLInputElement).value = '10:00';

    (document.getElementById('selectHora21') as HTMLInputElement).value = '14:00';
    (document.getElementById('selectHora22') as HTMLInputElement).value = '18:30';
    (document.getElementById('selectHora23') as HTMLInputElement).value = '14:00';
    (document.getElementById('selectHora24') as HTMLInputElement).value = '14:00';

    (document.getElementById('nombreEmp') as HTMLInputElement).value = 'Laura';
   }
     
  if(i == 2) {
    (document.getElementById('selectHora11') as HTMLInputElement).value = '16:00';
    (document.getElementById('selectHora12') as HTMLInputElement).value = '09:00';
    (document.getElementById('selectHora13') as HTMLInputElement).value = '16:00';
    (document.getElementById('selectHora14') as HTMLInputElement).value = '10:00';

    (document.getElementById('selectHora21') as HTMLInputElement).value = '20:00';
    (document.getElementById('selectHora22') as HTMLInputElement).value = '18:30';
    (document.getElementById('selectHora23') as HTMLInputElement).value = '20:00';
    (document.getElementById('selectHora24') as HTMLInputElement).value = '14:00';

    (document.getElementById('nombreEmp') as HTMLInputElement).value = 'Manuel';
  }  
  

}

editarHorario() {
  (document.getElementById('selectHorario5') as HTMLInputElement).value = '08:30';
  (document.getElementById('selectHorario6') as HTMLInputElement).value = '14:00';
  (document.getElementById('selectHorario7') as HTMLInputElement).value = '16:00';
  (document.getElementById('selectHorario8') as HTMLInputElement).value = '20:00';
  (document.getElementById('selectHorario9') as HTMLInputElement).value = '09:00';
  (document.getElementById('selectHorario10') as HTMLInputElement).value = '18:30';
  (document.getElementById('selectHorario13') as HTMLInputElement).value = '08:30';
  (document.getElementById('selectHorario14') as HTMLInputElement).value = '14:00';
  (document.getElementById('selectHorario15') as HTMLInputElement).value = '16:00';
  (document.getElementById('selectHorario16') as HTMLInputElement).value = '20:00';
  (document.getElementById('selectHorario17') as HTMLInputElement).value = '10:00';
  (document.getElementById('selectHorario18') as HTMLInputElement).value = '14:00';
}

editarServicio(servicio: any) {
  let servicioEditar = this.servicios[servicio];
  (document.getElementById('nombreServicio') as HTMLInputElement).value =  servicioEditar.nombre;
  (document.getElementById('precioServicio') as HTMLInputElement).value =  servicioEditar.precio;
  (document.getElementById('duracionServicio') as HTMLInputElement).value =  servicioEditar.duracion;
} 

}
