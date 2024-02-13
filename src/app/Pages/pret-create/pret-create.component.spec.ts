import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PretCreateComponent } from './pret-create.component';

describe('PretCreateComponent', () => {
  let component: PretCreateComponent;
  let fixture: ComponentFixture<PretCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PretCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PretCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
