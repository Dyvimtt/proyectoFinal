import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegFacturaComponent } from './reg-factura.component';

describe('RegFacturaComponent', () => {
  let component: RegFacturaComponent;
  let fixture: ComponentFixture<RegFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegFacturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
