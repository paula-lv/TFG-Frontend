import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CitaService } from 'src/app/services/cita.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  infoForm: FormGroup = new FormGroup('');
  submitted = false;
  isEditable = true;
  usuario: any = 'hola';

  resenas: any = '';
  citas: any = '';

  empresaModal: any = '';

  provincias =  require('../../../../assets/json/provincias.json');
  poblaciones: any = [];
  provSelect: any = '';
  poblSelect: any = '';

  constructor(private empresaService: EmpresaService, private servicioService: ServicioService, private empleadoService: EmpleadoService,
    private authService: AuthService, private fb: FormBuilder, private citaService: CitaService) { }

  ngOnInit(): void {
    this.infoForm = this.fb.group({
      name: ['', Validators.required],
      tlf: ['', [Validators.minLength(9), Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      tipo: ['0'],
      pobl: [''],
      prov: [''],
    })

    this.obtenerCitas();
    this.obtenerResenas();

    this.authService.getInfoUser(JSON.parse(localStorage.getItem('usuario')!).email).subscribe(res => {
      this.usuario = res;
      this.infoForm.controls['name'].setValue(this.usuario.name)
      this.infoForm.controls['email'].setValue(this.usuario.email)
      this.infoForm.controls['tlf'].setValue(this.usuario.telefono)
      this.provSelect = this.usuario.prov;
      this.infoForm.controls['prov'].setValue(this.provSelect);

    })
    //this.usuario = JSON.parse(localStorage.getItem('usuario')!);
  }

  get form() {
    return this.infoForm.controls;
  }

  selectProvincia() {
    this.infoForm.controls['prov'].setValue(this.provSelect.code);
    let poblaciones = require('../../../../assets/json/poblaciones.json');
    this.poblaciones = [];
    for(let i = 0; i < poblaciones.length; i++) {
      if(poblaciones[i].parent_code == this.provSelect.code)
        this.poblaciones.push(poblaciones[i])
    }

  }

  selectCiudad() {
    this.infoForm.controls['pobl'].setValue(this.poblSelect.code);
  }

  onSubmit(): void {
    this.submitted = true; 

    if(this.infoForm.invalid) {
      return;
    }
    /*this.authService.updateInfo(this.infoForm.getRawValue()).subscribe(res => {
      
    })*/
  }

  obtenerCitas() {
    this.citaService.getCitas(JSON.parse(localStorage.getItem('usuario')!).email, true, false).subscribe(res => {
      this.citas = res;
      console.log(this.citas)
    })
  }

  obtenerResenas() {
    this.citaService.getCitas(JSON.parse(localStorage.getItem('usuario')!).email, false, true).subscribe(res => {
      this.resenas = res;
      console.log(this.resenas)
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

  setEmpresa(index: number) {
    this.empresaModal = index;
  }

  getPoblacion(prov: any, pobl: any) {
    let poblaciones = require('../../../../assets/json/poblaciones.json');

    for(let i = 0; i < poblaciones.length; i++) {
      if(poblaciones[i].parent_code == prov && poblaciones[i].code == pobl)
          return poblaciones[i].label;
    }

    return 0;
  }

  getProvincia(prov: any){
    let provincias = require('../../../../assets/json/provincias.json');
    for(let i = 0; i < provincias.length; i++) {
      if(provincias[i].code == prov)
        return provincias[i].label
    }
    return 0
  }

}
