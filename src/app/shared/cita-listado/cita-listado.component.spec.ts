import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaListadoComponent } from './cita-listado.component';

describe('CitaListadoComponent', () => {
  let component: CitaListadoComponent;
  let fixture: ComponentFixture<CitaListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitaListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
