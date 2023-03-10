import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent implements OnInit {

  recoveryForm: FormGroup = new FormGroup('');
  submitted = false;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.recoveryForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
    })
  }

  get form() {
    return this.recoveryForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if(this.recoveryForm.invalid) {
      return;
    }

    this.router.navigateByUrl('/');
  }

}
