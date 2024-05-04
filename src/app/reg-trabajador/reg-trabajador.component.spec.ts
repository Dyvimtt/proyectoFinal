import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegTrabajadorComponent } from './reg-trabajador.component';

describe('RegTrabajadorComponent', () => {
  let component: RegTrabajadorComponent;
  let fixture: ComponentFixture<RegTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegTrabajadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
