import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExpenseAccountComponent } from './create-expense-account.component';

describe('CreateExpenseAccountComponent', () => {
  let component: CreateExpenseAccountComponent;
  let fixture: ComponentFixture<CreateExpenseAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExpenseAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExpenseAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
