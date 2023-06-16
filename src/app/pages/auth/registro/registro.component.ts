import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserI } from 'src/app/models/user';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  registerForm: FormGroup = new FormGroup('');
  submitted = false;
  usuario = true;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      psw: ['', [Validators.required, Validators.minLength(6)]],
      rpsw: ['', Validators.required]
    },
    {
      validator: this.MustMatch('psw', 'rpsw')
    }
    )
  }

  get form() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true; 

    if(this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.registerForm.getRawValue()).subscribe(res => {
      this.router.navigateByUrl('/');
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
    } else {
      this.usuario = true;
    }
  }

}
