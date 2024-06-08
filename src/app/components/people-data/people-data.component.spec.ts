import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleDataComponent } from './people-data.component';

describe('PeopleDataComponent', () => {
  let component: PeopleDataComponent;
  let fixture: ComponentFixture<PeopleDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
