import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralProveedorComponent } from './general-proveedor.component';

describe('GeneralProveedorComponent', () => {
  let component: GeneralProveedorComponent;
  let fixture: ComponentFixture<GeneralProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralProveedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
