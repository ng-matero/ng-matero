import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsRouteGuardComponent } from './route-guard.component';

describe('PermissionsRouteGuardComponent', () => {
  let component: PermissionsRouteGuardComponent;
  let fixture: ComponentFixture<PermissionsRouteGuardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PermissionsRouteGuardComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsRouteGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
