import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forms-dynamic',
  templateUrl: './dynamic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        required: true,
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

  // Advanced Layout
  form2 = new FormGroup({});
  model2: any = {};
  options: FormlyFormOptions = {};

  fields2: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'firstName',
          templateOptions: {
            label: 'First Name',
            required: true,
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'lastName',
          templateOptions: {
            label: 'Last Name',
            required: true,
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.firstName',
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'street',
          templateOptions: {
            label: 'Street',
          },
        },
        {
          className: 'col-sm-3',
          type: 'combobox',
          key: 'cityId',
          templateOptions: {
            label: 'City',
            options: [
              { id: 1, name: '北京' },
              { id: 2, name: '上海' },
              { id: 3, name: '广州' },
              { id: 4, name: '深圳' },
            ],
            labelProp: 'name',
            valueProp: 'id',
            required: true,
            description: 'This is a custom field type.',
          },
          wrappers: ['form-field'],
        },
        {
          className: 'col-sm-3',
          type: 'input',
          key: 'zip',
          templateOptions: {
            type: 'number',
            label: 'Zip',
            max: 99999,
            min: 0,
            pattern: '\\d{5}',
          },
        },
      ],
    },
    {
      type: 'textarea',
      key: 'otherInput',
      templateOptions: {
        label: 'Other Input',
      },
    },
    {
      type: 'checkbox',
      key: 'otherToo',
      templateOptions: {
        label: 'Other Checkbox',
      },
    },
  ];

  constructor(private toast: ToastrService) {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.showToast(this.model);
    }
  }

  submit2() {
    if (this.form2.valid) {
      this.showToast(this.model2);
    }
  }

  showToast(obj: any) {
    this.toast.success(JSON.stringify(obj));
  }
}
