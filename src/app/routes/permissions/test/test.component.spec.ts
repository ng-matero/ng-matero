import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsTestComponent } from './test.component';

describe('PermissionsTestComponent', () => {
  let component: PermissionsTestComponent;
  let fixture: ComponentFixture<PermissionsTestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PermissionsTestComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
