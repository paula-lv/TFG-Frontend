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
    
  }

  obtenerResenas() {
    this.citaService.getResenas(JSON.parse(localStorage.getItem('usuario')!).email).subscribe(data => {
      this.resenas = data;
    }, error => {
      console.log(error);
    })
  }

}
