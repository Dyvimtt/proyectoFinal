import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModDocumentosComponent } from './mod-documentos.component';

describe('ModDocumentosComponent', () => {
  let component: ModDocumentosComponent;
  let fixture: ComponentFixture<ModDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModDocumentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
