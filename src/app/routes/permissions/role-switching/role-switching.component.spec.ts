import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsRoleSwitchingComponent } from './role-switching.component';

describe('PermissionsRoleSwitchingComponent', () => {
  let component: PermissionsRoleSwitchingComponent;
  let fixture: ComponentFixture<PermissionsRoleSwitchingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PermissionsRoleSwitchingComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsRoleSwitchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
