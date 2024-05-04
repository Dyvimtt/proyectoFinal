import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralFacturasComponent } from './general-facturas.component';

describe('GeneralFacturasComponent', () => {
  let component: GeneralFacturasComponent;
  let fixture: ComponentFixture<GeneralFacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralFacturasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
