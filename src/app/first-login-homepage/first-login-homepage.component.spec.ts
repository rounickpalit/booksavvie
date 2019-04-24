import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLoginHomepageComponent } from './first-login-homepage.component';

describe('FirstLoginHomepageComponent', () => {
  let component: FirstLoginHomepageComponent;
  let fixture: ComponentFixture<FirstLoginHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstLoginHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstLoginHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
