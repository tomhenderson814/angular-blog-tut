import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterLoginComponent } from './enter-login.component';

describe('EnterLoginComponent', () => {
  let component: EnterLoginComponent;
  let fixture: ComponentFixture<EnterLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
