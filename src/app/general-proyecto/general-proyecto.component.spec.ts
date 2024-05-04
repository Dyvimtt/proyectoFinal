import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralProyectoComponent } from './general-proyecto.component';

describe('GeneralProyectoComponent', () => {
  let component: GeneralProyectoComponent;
  let fixture: ComponentFixture<GeneralProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralProyectoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
