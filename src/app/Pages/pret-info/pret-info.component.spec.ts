import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PretInfoComponent } from './pret-info.component';

describe('PretInfoComponent', () => {
  let component: PretInfoComponent;
  let fixture: ComponentFixture<PretInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PretInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PretInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
