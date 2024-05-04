import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegProyectoComponent } from './reg-proyecto.component';

describe('RegProyectoComponent', () => {
  let component: RegProyectoComponent;
  let fixture: ComponentFixture<RegProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegProyectoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
