import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsSelectEditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: FormsSelectEditComponent;
  let fixture: ComponentFixture<FormsSelectEditComponent>;

  beforeEach(async(() => {
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
