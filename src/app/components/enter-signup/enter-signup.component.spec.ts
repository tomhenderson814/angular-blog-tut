import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterSignupComponent } from './enter-signup.component';

describe('EnterSignupComponent', () => {
  let component: EnterSignupComponent;
  let fixture: ComponentFixture<EnterSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
