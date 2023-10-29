import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TexpensesComponent } from './texpenses.component';

describe('TexpensesComponent', () => {
  let component: TexpensesComponent;
  let fixture: ComponentFixture<TexpensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TexpensesComponent]
    });
    fixture = TestBed.createComponent(TexpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
