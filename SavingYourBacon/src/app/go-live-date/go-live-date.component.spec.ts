import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoLiveDateComponent } from './go-live-date.component';

describe('GoLiveDateComponent', () => {
  let component: GoLiveDateComponent;
  let fixture: ComponentFixture<GoLiveDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoLiveDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoLiveDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
