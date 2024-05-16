import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegDocumentoComponent } from './reg-documento.component';

describe('RegDocumentoComponent', () => {
  let component: RegDocumentoComponent;
  let fixture: ComponentFixture<RegDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegDocumentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
