import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTrabajadorComponent } from './general-trabajador.component';

describe('GeneralTrabajadorComponent', () => {
  let component: GeneralTrabajadorComponent;
  let fixture: ComponentFixture<GeneralTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralTrabajadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
