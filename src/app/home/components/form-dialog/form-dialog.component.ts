import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Validators,
  ValidatorFn,
  AbstractControl,
  FormBuilder
} from '@angular/forms';

import { FormData } from '../../models/form-data';
import { WithName } from '../../models/select-data';
import {
  NameValidation,
  PhoneValidation,
  EmailValidation
} from '../../validators/form-validators';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent {
  public optionsList: WithName[] = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' },
    { name: 'Item 4' }
  ];
  public formData: FormData = {
    name: null,
    dateAndTime: null,
    email: null,
    phone: null,
    checkbox: null,
    selectOption: null
  };

  public reactiveForm = this.formBuilder.group({
    name: ['', [Validators.required, NameValidation]],
    dateAndTime: [
      '',
      [
        Validators.required,
        this.dateValidator(),
        this.timeValidator(),
        this.intervalValidator()
      ]
    ],
    phone: ['', [Validators.required, PhoneValidation]],
    email: ['', [Validators.required, Validators.email, EmailValidation]],
    checkbox: ['', []],
    selectOption: [this.optionsList, [Validators.required]]
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
    if (this.reactiveForm.invalid) {
      return;
    }
    let selected = this.reactiveForm.value.selectOption?.filter(
      (item) => item.isSelected === true
    );
    this.formData = this.reactiveForm.value as FormData;
    if (selected) {
      this.formData.selectOption = selected[0].name;
    }
    this.formData.name = this.formData.name!.trim();
    this.dialogRef.close({
      data: this.formData
    });
  }

  public onChangeEvent(event: any) {
    if (event.checked) {
      this.formData.checkbox = true;
    } else {
      this.formData.checkbox = false;
    }
  }

  private checkDate(string: string): boolean {
    const today = new Date();
    const date: Date = new Date(string.split(' ')[0]);
    if (date < today || date.toString() === 'Invalid Date') {
      return true;
    } else {
      return false;
    }
  }

  private dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!(control && control.value)) {
        return null;
      }
      return this.checkDate(control.value)
        ? { invalidDate: 'Invalid date' }
        : null;
    };
  }

  private checkTime(string: string, i: number): boolean {
    const time = string.split(' ')[i];
    if (!time) {
      return true;
    }
    const hours = +time.split(':')[0];
    const minutes = +time.split(':')[1];
    if (hours > 24 || hours < 0 || minutes < 0 || minutes > 59) {
      return true;
    } else {
      return false;
    }
  }

  private timeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!(control && control.value)) {
        return null;
      }
      if (control.value.length > 16) {
        return this.checkTime(control.value, 3)
          ? { invalidDate: 'Invalid time' }
          : null;
      } else
        return this.checkTime(control.value, 1)
          ? { invalidDate: 'Invalid time' }
          : null;
    };
  }

  private calculateInterval(
    startHour: number,
    endHour: number,
    startMin: number,
    endMin: number
  ): number {
    return (endHour - startHour) * 60 + (endMin - startMin);
  }

  private checkInterval(string: string): boolean {
    let dateTimeArray = string.split(' ');
    if (dateTimeArray.length <= 2) {
      return false;
    }
    let startTime = dateTimeArray[1];
    let startHour = +startTime.split(':')[0];
    let startMin = +startTime.split(':')[1];
    let endTime = dateTimeArray[3];
    let endHour = +endTime.split(':')[0];
    let endMin = +endTime.split(':')[1];
    if (startHour > endHour) {
      return true;
    }
    if (startHour === endHour && startMin >= endMin) {
      return true;
    }
    if (this.calculateInterval(startHour, endHour, startMin, endMin) > 120) {
      return true;
    } else {
      return false;
    }
  }

  private intervalValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!(control && control.value)) {
        return null;
      }
      if (control.value.length < 16) {
        return null;
      }
      return this.checkInterval(control.value)
        ? { invalidDate: 'Invalid interval' }
        : null;
    };
  }
}
