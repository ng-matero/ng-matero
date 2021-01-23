import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsSelectEditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: FormsSelectEditComponent;
  let fixture: ComponentFixture<FormsSelectEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsSelectEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsSelectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
