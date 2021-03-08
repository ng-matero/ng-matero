import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsDatetimeComponent } from './datetime.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';

describe('DatetimeComponent', () => {
  let component: FormsDatetimeComponent;
  let fixture: ComponentFixture<FormsDatetimeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, MatNativeDateModule, TranslateModule.forRoot()],
      declarations: [FormsDatetimeComponent],
    }).compileComponents();
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
