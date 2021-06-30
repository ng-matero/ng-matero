import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsRoleSwitchingComponent } from './role-switching.component';

import { NgxPermissionsModule, NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

describe('PermissionsRoleSwitchingComponent', () => {
  let component: PermissionsRoleSwitchingComponent;
  let fixture: ComponentFixture<PermissionsRoleSwitchingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgxPermissionsModule.forRoot()],
        providers: [NgxRolesService, NgxPermissionsService],
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
