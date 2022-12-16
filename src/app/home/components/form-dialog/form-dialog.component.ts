import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormBuilder } from '@angular/forms';

import { FormData } from '../../models/form-data';
import { WithName } from '../../models/select-data';
import {
  NameValidation,
  PhoneValidation,
  EmailValidation,
  IntervalValidator,
  TimeValidator,
  DateValidator
} from '../../validators/form-validators';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent {
  public options: WithName[] = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' },
    { name: 'Item 4' }
  ];

  public form = this.formBuilder.group({
    name: ['', [Validators.required, NameValidation]],
    dateAndTime: [
      '',
      [
        Validators.required,
        DateValidator(),
        TimeValidator(),
        IntervalValidator()
      ]
    ],
    phone: ['', [Validators.required, PhoneValidation]],
    email: ['', [Validators.required, Validators.email, EmailValidation]],
    isApproximateDate: [false, []],
    selectOption: [this.options, [Validators.required]]
  });

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormData,
    private formBuilder: FormBuilder
  ) {}

  public onCloseClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.form.value.name = this.form.value.name?.trim();
    this.dialogRef.close({
      data: this.form.value
    });
  }

  public onChangeEvent(event: any) {
    if (event.checked) {
      this.form.value.isApproximateDate = true;
    } else {
      this.form.value.isApproximateDate = false;
    }
  }
}
