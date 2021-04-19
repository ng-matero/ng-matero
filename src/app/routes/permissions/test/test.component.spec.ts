import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPermissionsModule } from 'ngx-permissions';
import { PermissionsTestComponent } from './test.component';

describe('PermissionsTestComponent', () => {
  let component: PermissionsTestComponent;
  let fixture: ComponentFixture<PermissionsTestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PermissionsTestComponent],
        imports: [NgxPermissionsModule.forRoot()],
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
