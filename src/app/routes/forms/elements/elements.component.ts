import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ControlsOf, IProfile } from 'app/routes/profile/interface';

@Component({
  selector: 'app-forms-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss'],
})
export class FormsElementsComponent implements OnInit, OnDestroy {
  q = {
    username: '',
    email: '',
    gender: '',
  };

  reactiveForm1: FormGroup<ControlsOf<IProfile>>;
  reactiveForm2: FormGroup<ControlsOf<IProfile>>;

  translateSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<any>,
    private translate: TranslateService
  ) {
    this.reactiveForm1 = this.fb.nonNullable.group({
      username: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      city: [''],
      address: [''],
      company: [''],
      tele: [''],
      website: [''],
      date: [''],
    });

    this.reactiveForm2 = this.fb.nonNullable.group({
      username: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      city: [''],
      address: [''],
      company: [''],
      tele: [''],
      website: [''],
      date: [''],
    });
  }

  ngOnInit() {
    this.translateSubscription = this.translate.onLangChange.subscribe((res: { lang: any }) => {
      this.dateAdapter.setLocale(res.lang);
    });
  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
  }

  getErrorMessage(form: FormGroup) {
    return form.get('email')?.hasError('required')
      ? 'validations.required'
      : form.get('email')?.hasError('email')
      ? 'validations.invalid_email'
      : '';
  }
}
