import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseOverviewComponent } from './expense-overview.component';

describe('ExpenseOverviewComponent', () => {
  let component: ExpenseOverviewComponent;
  let fixture: ComponentFixture<ExpenseOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
