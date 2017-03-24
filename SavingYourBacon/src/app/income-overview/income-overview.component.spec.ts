import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeOverviewComponent } from './income-overview.component';

describe('IncomeOverviewComponent', () => {
  let component: IncomeOverviewComponent;
  let fixture: ComponentFixture<IncomeOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
