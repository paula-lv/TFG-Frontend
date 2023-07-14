import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  registerForm: FormGroup = new FormGroup('');
  submitted = false;
  usuario = true;
  provincias =  require('../../../../assets/json/provincias.json');
  poblaciones: any = [];
  provSelect: any = '';
  poblSelect: any = '';

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      cif: ['', [Validators.minLength(9), Validators.maxLength(9)]],
      tlf: ['', [Validators.minLength(9), Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      psw: ['', [Validators.required, Validators.minLength(6)]],
      rpsw: ['', Validators.required],
      tipo: ['0'],
      pobl: [''],
      prov: [''],
    },
    {
      validator: this.MustMatch('psw', 'rpsw')
    }
    )
  }

  get form() {
    return this.registerForm.controls;
  }

  selectProvincia() {
    this.registerForm.controls['prov'].setValue(this.provSelect.code);
    let poblaciones = require('../../../../assets/json/poblaciones.json');
    this.poblaciones = [];
    for(let i = 0; i < poblaciones.length; i++) {
      if(poblaciones[i].parent_code == this.provSelect.code)
        this.poblaciones.push(poblaciones[i])
    }

  }

  selectCiudad() {
    this.registerForm.controls['pobl'].setValue(this.poblSelect.code);
  }

  onSubmit(): void {
    this.submitted = true; 

    if(this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.getRawValue()).subscribe(res => {
      environment.tipoUsuario =  this.registerForm.controls['tipo'].value;
      this.router.navigate(['/login']);
    })
  }

  MustMatch(controlName: string, matchingControlName: string) { 
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
         // return if another validator has already found an error on the matchingControl return;
        return;
      }
   
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) { 
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      
    };
  }

  cargarFormulario(i: number) {
    if(i == 1) {
      this.usuario = false;
      this.registerForm.controls['tipo'].setValue('1');
      (document.getElementsByTagName('section')[0] as HTMLElement).style.backgroundImage = 'url("../../../../assets/images/bg-2.jpg")';
    } else {
      this.usuario = true;
      this.registerForm.controls['tipo'].setValue('0');
      (document.getElementsByTagName('section')[0] as HTMLElement).style.backgroundImage = 'url("../../../../assets/images/bg-1.jpg")';
    }
  }

}
