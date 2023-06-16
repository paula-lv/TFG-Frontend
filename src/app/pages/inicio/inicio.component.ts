import { Component, OnInit } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})



export class InicioComponent implements OnInit {

  public empresas: any;

  constructor(private empresaService: EmpresaService) { 
  }

  ngOnInit(): void {
    this.obtenerEmpresas();
  }

  obtenerEmpresas() {
    this.empresaService.getEmpresas().subscribe(data => {
      this.empresas = data;
    }, error => {
      console.log(error);
    })
  }

  personalizarEmpresas(i: any) {
      let tarjeta = document.getElementsByTagName('mat-card-header')[i];
      (tarjeta as HTMLElement).style.backgroundColor = '#'+this.empresas[i].color;
  }

}
