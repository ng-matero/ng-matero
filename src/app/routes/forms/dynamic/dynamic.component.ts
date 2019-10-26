import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forms-dynamic',
  templateUrl: './dynamic.component.html',
})
export class FormsDynamicComponent implements OnInit {
  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'text',
      type: 'input',
      templateOptions: {
        label: 'Text',
        placeholder: 'Type here to see the other field become enabled...',
      },
    },
    {
      key: 'text2',
      type: 'input',
      templateOptions: {
        label: 'Hey!',
        placeholder: 'This one is disabled if there is no text in the other input',
      },
      expressionProperties: {
        'templateOptions.disabled': '!model.text',
      },
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      },
    },
  ];

  constructor(private toastr: ToastrService) {}

  ngOnInit() {}

  submit() {
    this.showToast();
  }

  showToast() {
    this.toastr.success(JSON.stringify(this.model));
  }
}
