import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInicioComponent } from './general-inicio.component';

describe('GeneralInicioComponent', () => {
  let component: GeneralInicioComponent;
  let fixture: ComponentFixture<GeneralInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralInicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
