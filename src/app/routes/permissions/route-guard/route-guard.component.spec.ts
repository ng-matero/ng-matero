import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsRouteGuardComponent } from './route-guard.component';

import { NgxPermissionsModule } from 'ngx-permissions';
import { RouterTestingModule } from '@angular/router/testing';

describe('PermissionsRouteGuardComponent', () => {
  let component: PermissionsRouteGuardComponent;
  let fixture: ComponentFixture<PermissionsRouteGuardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, NgxPermissionsModule.forRoot()],
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
