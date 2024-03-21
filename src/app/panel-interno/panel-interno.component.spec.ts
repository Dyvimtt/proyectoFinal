import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelInternoComponent } from './panel-interno.component';

describe('PanelInternoComponent', () => {
  let component: PanelInternoComponent;
  let fixture: ComponentFixture<PanelInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelInternoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
