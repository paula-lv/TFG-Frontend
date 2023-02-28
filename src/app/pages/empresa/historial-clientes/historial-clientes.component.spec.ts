import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialClientesComponent } from './historial-clientes.component';

describe('HistorialClientesComponent', () => {
  let component: HistorialClientesComponent;
  let fixture: ComponentFixture<HistorialClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
