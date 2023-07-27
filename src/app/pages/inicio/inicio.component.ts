import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})



export class InicioComponent implements OnInit {


  public empresas: any;
  public citas: any;

  servicio: any;
  desde: any;
  hasta:any;
  empleado: any;
  empresa: any;
  direccion: any;

  citaReserva:any;

  proximasCitas: any;
  empresaModal: any = '';

  citaResena = {
    direccion : "Calle Eusebi Sempere 13, Alcocer de Planes, Alicante/Alacant",
    servicio : "Corte de pelo",
    empleado : "Paula",
    fecha_desde : "2023-07-25T10:00:00.000+00:00",
    fecha_hasta : "2023-07-25T11:30:00.000+00:00",
    empresa: "Vikingos"
  }

  constructor(private empresaService: EmpresaService, private citaService: CitaService) { 
  }

  ngOnInit(): void {
    this.filtrarEmpresas('');
    this.setDate();
    this.obtenerProximasCitas();
  }

  setDate() {
    (document.getElementById('selectFecha') as HTMLInputElement).valueAsDate = new Date();
    let hora = new Date().getHours();
    let minutos: any = new Date().getMinutes();
    if(minutos < 10)
      minutos = '0' + minutos;
    (document.getElementById('selectHora') as HTMLInputElement).value = hora + ':' + minutos;
    (document.getElementById('selectHora2') as HTMLInputElement).value = '23:59';
  }

  /*obtenerEmpresas() {
    this.empresaService.getEmpresas().subscribe(data => {
      this.empresas = data;
      console.log(this.empresas)
    }, error => {
      console.log(error);
    })
  }*/

  personalizarEmpresas(i: any) {
      let tarjeta = document.getElementsByClassName('empresa'+i);
      let bordes = document.getElementsByClassName('borde'+i);
      let boton = document.getElementsByClassName('boton'+i);
      for (let j = 0; j < tarjeta.length; j++) {
        (tarjeta[j] as HTMLElement).style.backgroundColor = '#'+this.empresas[i].color;
      }

      for (let j = 0; j < bordes.length; j++) {
        (bordes[j] as HTMLElement).style.border  = 'solid 1px #'+this.empresas[i].color;
      }

      for (let j = 0; j < boton.length; j++) {
        (boton[j] as HTMLElement).style.backgroundColor  = '#'+this.empresas[i].color;
      }
      
  }

  getHorario(i: any) {
    let div = document.querySelector('#div'+i);
    div?.replaceChildren();
    let semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    
    if(this.empresas[i].horario != undefined) {
      let horario = this.empresas[i].horario; //L;09:00-18:30*M;08:30-14:00&16:00-20:00*X:09:00-18:30*J;08:30-14:00&16:00-20:00*V;10:00-14:00
      let dias = horario.split('*') // L;09:00-18:30   //M;08:30-14:00&16:00-20:00   //X:09:00-18:30    //J;08:30-14:00&16:00-20:00    //V;10:00-14:00
      for(let j = 0; j < dias.length; j++) {
        //  Voy comprobando si abre todos los días o no
        let box = document.createElement("div");
        box.classList.add('col-3')
        box.innerText = /*dias[j].split(';')[0]*/ semana[j];
        div?.appendChild(box);
        let box2 = document.createElement('div');
        box2.classList.add('col-9');
        box2.innerText = dias[j].split(';')[1];
        div?.appendChild(box2);
      }
        
      }
    return 0
  }

  getPoblacion(index: any) {
    let poblaciones = require('../../../assets/json/poblaciones.json');
    if(this.empresas[index].prov != undefined && this.empresas[index].pobl != undefined)
      for(let i = 0; i < poblaciones.length; i++) {
        if(poblaciones[i].parent_code == this.empresas[index].prov && poblaciones[i].code == this.empresas[index].pobl) {
          let devuelve = ', ' + poblaciones[i].label;
          return devuelve;
        }
            
      }
      return;
  }

  getProvincia(index: any){
    let provincias = require('../../../assets/json/provincias.json');
    if(this.empresas[index].prov != undefined && this.empresas[index].pobl != undefined)
      for(let i = 0; i < provincias.length; i++) {
        if(provincias[i].code == this.empresas[index].prov) {
          let devuelve = ', ' + provincias[i].label
          return devuelve;
        }
          
      }
    return;
  }

  filtrarEmpresas(cambio: string) {
    let cercania;
    let servicio;
    let valor;
    let fechaDesde;
    let fechaHasta;

    let fecha;
    let horaDesde;
    let horaHasta;

    let pobl;
    let prov

    cercania = (document.getElementById('selectCercania') as HTMLInputElement).value;

    switch(cercania) {
      case '0':
        cercania = 'ciudad';
        pobl = JSON.parse(localStorage.getItem('usuario')!).poblacion;
        prov = JSON.parse(localStorage.getItem('usuario')!).provincia;
        break;
      
      case '1':
        cercania = 'provincia';
        pobl = -1;
        prov = JSON.parse(localStorage.getItem('usuario')!).provincia;
        break;
      
      case '2':
        cercania = 'todas';
        break;
    }

    servicio = (document.getElementById('selectServicio') as HTMLInputElement).value;

    switch(servicio) {
      case '0':
        servicio = 'Todos';
        break;
      
      case '1':
        servicio = 'Corte de pelo';
        break;
      
      case '2':
        servicio = 'Manicura';
        break;
      
      case '3':
        servicio = 'Pedicura';
        break;
      
      case '4':
        servicio = 'Maquillaje';
        break;
    }

    valor = (document.getElementById('selectValoracion') as HTMLInputElement).value;

    fechaDesde = (document.getElementById('selectFecha') as HTMLInputElement).value;
    horaDesde = (document.getElementById('selectHora') as HTMLInputElement).value;
    horaHasta = (document.getElementById('selectHora2') as HTMLInputElement).value;

    if(fechaDesde == "" && horaDesde == "" && horaHasta == ""){
      let mes:any = new Date().getMonth();
      mes = mes+1;
      if(mes < 10)
        mes = '0' + mes;

      let dia:any = new Date().getDate();
      if(dia < 10)
        dia = '0' + dia;

      let hora:any = new Date().getHours();
      if(hora < 10)
      hora = '0' + hora;

      let minuto:any = new Date().getMinutes();
      if(minuto < 10)
        minuto = '0' + minuto;

      let segundo:any = new Date().getMinutes();
      if(segundo < 10)
      segundo = '0' + segundo;

      fechaDesde = new Date().getFullYear() + '-' + mes + '-' + dia + "T" + hora + ':' + minuto + ':' + segundo + ".000+00:00";
      fechaHasta = new Date().getFullYear() + '-' + mes + '-' + dia + "T" + '23:59:00' + ".000+00:00";
    }

    this.empresaService.getEmpresas(servicio, pobl, prov, valor, fechaDesde, fechaHasta, false).subscribe(res => {
      this.empresas = res[0];
      this.citas = res[1];
      console.log(this.citas)
      console.log(this.empresas)
    })
  }

  formatearFecha(fecha: String) { //2023-07-19T10:00:00.000Z
    if(fecha != undefined) {
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
      let devuelve = fechaDividida[2] + ' de ' + mes + ', ' +  horaDividida[0] + ':' + horaDividida[1];
      return devuelve;
    } else return;
    
  }

  modalReservar(i: any, j: any) {
    let empresa = this.empresas[i];
    let cita = this.citas[j];
    this.servicio = cita.servicio;
    this.desde = this.formatearFecha(cita.fecha_desde);
    this.hasta = this.formatearFecha(cita.fecha_hasta);
    this.empleado = cita.empleado;
    this.empresa = empresa.nombre;
    this.direccion = empresa.direccion +  this.getPoblacion(i) + this.getProvincia(i);

    this.citaReserva = this.citas[j];
  }

  reservarCita() {
    this.citaService.reservarCita(this.citaReserva).subscribe(res => {
      Swal.fire({
        title: 'Hecho',
        text: 'Cita reservada con éxito',
        icon: 'success',
        confirmButtonText: 'Continuar'
      })
      this.filtrarEmpresas('');
      this.obtenerProximasCitas();
    })
  }

  obtenerProximasCitas() {
    this.citaService.getCitas(JSON.parse(localStorage.getItem('usuario')!).email, true, false).subscribe(res => {
      this.proximasCitas = res;
    })
  }

  setEmpresa(index: number) {
    this.empresaModal = index;
    console.log(this.empresaModal)
  }

  getPoblacion2(prov: any, pobl: any) {
    let poblaciones = require('../../../assets/json/poblaciones.json');

    for(let i = 0; i < poblaciones.length; i++) {
      if(poblaciones[i].parent_code == prov && poblaciones[i].code == pobl)
          return poblaciones[i].label;
    }

    return 0;
  }

  getProvincia2(prov: any){
    let provincias = require('../../../assets/json/provincias.json');
    for(let i = 0; i < provincias.length; i++) {
      if(provincias[i].code == prov)
        return provincias[i].label
    }
    return 0
  }

  pintarEstrellas(i: number) {
     
    let estrellas = document.getElementsByClassName('boton');
    switch(i) {
      case 1:
        estrellas[0].innerHTML = 'star';
        estrellas[1].innerHTML = 'star_border';
        estrellas[2].innerHTML = 'star_border';
        estrellas[3].innerHTML = 'star_border';
        estrellas[4].innerHTML = 'star_border';
        break;
      case 2:
        estrellas[0].innerHTML = 'star';
        estrellas[1].innerHTML = 'star';
        estrellas[2].innerHTML = 'star_border';
        estrellas[3].innerHTML = 'star_border';
        estrellas[4].innerHTML = 'star_border';
        break;
      case 3:
        estrellas[0].innerHTML = 'star';
        estrellas[1].innerHTML = 'star';
        estrellas[2].innerHTML = 'star';
        estrellas[3].innerHTML = 'star_border';
        estrellas[4].innerHTML = 'star_border';
        break;
      case 4:
        estrellas[0].innerHTML = 'star';
        estrellas[1].innerHTML = 'star';
        estrellas[2].innerHTML = 'star';
        estrellas[3].innerHTML = 'star';
        estrellas[4].innerHTML = 'star_border';
        break;
      case 5:
        estrellas[0].innerHTML = 'star';
        estrellas[1].innerHTML = 'star';
        estrellas[2].innerHTML = 'star';
        estrellas[3].innerHTML = 'star';
        estrellas[4].innerHTML = 'star';
        break;
    }
  }

}
