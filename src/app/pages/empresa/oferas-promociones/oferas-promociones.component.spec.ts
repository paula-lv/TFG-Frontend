import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OferasPromocionesComponent } from './oferas-promociones.component';

describe('OferasPromocionesComponent', () => {
  let component: OferasPromocionesComponent;
  let fixture: ComponentFixture<OferasPromocionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OferasPromocionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OferasPromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
