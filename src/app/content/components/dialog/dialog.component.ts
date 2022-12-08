import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormControl,
  Validators,
  FormGroup,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

import { formData } from '../../models/form-data';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  public isChecked = false;
  public formData!: formData;
  public reactiveForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    dateAndTime: new FormControl('', [
      Validators.required,
      this.dateValidator(),
      this.timeValidator(),
      this.intervalValidator(),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /(\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4}))/
      ),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    ]),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: formData
  ) {}

  public onCloseClick(): void {
    this.dialogRef.close();
  }

  public onChangeEvent(event: any): void {
    this.isChecked = event.checked;
  }

  public onSubmit(): void {
    if (this.reactiveForm.invalid) {
      return;
    }
    this.formData = this.reactiveForm.value;
    this.dialogRef.close({
      data: this.formData,
    });
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
}
