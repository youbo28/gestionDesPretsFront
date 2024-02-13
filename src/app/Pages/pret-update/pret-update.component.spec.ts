import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PretUpdateComponent } from './pret-update.component';

describe('PretUpdateComponent', () => {
  let component: PretUpdateComponent;
  let fixture: ComponentFixture<PretUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PretUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PretUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
