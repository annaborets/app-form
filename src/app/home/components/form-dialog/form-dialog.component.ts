import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormBuilder } from '@angular/forms';

import { FormData } from '../../models/form-data';
import { WithName } from '../../models/select-data';
import {
  NameValidation,
  PhoneValidation,
  EmailValidation,
  DateValidator
} from '../../validators/form-validators';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent {
  public timeSlotsPlaceholder = 'Choose time slot';
  public itemsPlaceholder = 'Choose item';
  public optionsForItems: WithName[] = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' },
    { name: 'Item 4' }
  ];

  public optionsForTimeSlots: WithName[] = [
    { name: '9 - 11' },
    { name: '11 - 13' },
    { name: '13 - 15' },
    { name: '15 - 17' }
  ];

  public form = this.formBuilder.group({
    name: ['', [Validators.required, NameValidation]],
    date: ['', [Validators.required, DateValidator()]],
    selectedTimeSlot: ['', [Validators.required]],
    phone: ['', [Validators.required, PhoneValidation]],
    email: ['', [Validators.required, Validators.email, EmailValidation]],
    selectOption: [this.optionsForItems, [Validators.required]]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FormData,
    private dialogRef: MatDialogRef<FormDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  public onCloseClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.form.invalid) return;

    this.form.value.name = this.form.value.name?.trim();
    this.dialogRef.close({
      data: this.form.value
    });
  }
}
