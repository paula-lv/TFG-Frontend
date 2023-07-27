import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';

@Component({
  selector: 'app-resena',
  templateUrl: './resena.component.html',
  styleUrls: ['./resena.component.scss']
})
export class ResenaComponent implements OnInit {

  constructor(private citaService: CitaService) { }

  resenas: any = '';

  ngOnInit(): void {
    this.obtenerResenas()
    
  }

  obtenerResenas() {
    this.citaService.getResenas(JSON.parse(localStorage.getItem('usuario')!).email).subscribe(data => {
      this.resenas = data;
      console.log(this.resenas)
    }, error => {
      console.log(error);
    })
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

}
