import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VstatementComponent } from './vstatement.component';

describe('VstatementComponent', () => {
  let component: VstatementComponent;
  let fixture: ComponentFixture<VstatementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VstatementComponent]
    });
    fixture = TestBed.createComponent(VstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
