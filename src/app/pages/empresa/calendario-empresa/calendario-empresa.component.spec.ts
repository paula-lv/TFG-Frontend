import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioEmpresaComponent } from './calendario-empresa.component';

describe('CalendarioEmpresaComponent', () => {
  let component: CalendarioEmpresaComponent;
  let fixture: ComponentFixture<CalendarioEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
