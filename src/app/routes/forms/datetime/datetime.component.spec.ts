import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsDatetimeComponent } from './datetime.component';

describe('DatetimeComponent', () => {
  let component: FormsDatetimeComponent;
  let fixture: ComponentFixture<FormsDatetimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsDatetimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
