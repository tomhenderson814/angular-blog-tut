import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTxComponent } from './create-tx.component';

describe('CreateTxComponent', () => {
  let component: CreateTxComponent;
  let fixture: ComponentFixture<CreateTxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
