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
  public ranges = [
    { value: '10 - 12', viewValue: '10 - 12' },
    { value: '12 - 14', viewValue: '12 - 14' },
    { value: '14 - 16', viewValue: '14 - 16' },
    { value: '16 - 18', viewValue: '16 - 18' },
    { value: '18 - 20', viewValue: '18 - 20' },
  ];
  public formData!: formData;
  public reactiveForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    date: new FormControl('', [Validators.required, this.dateValidator()]),
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
    timeRange: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: formData
  ) {}

  public onCloseClick(): void {
    this.dialogRef.close();
  }

  public onChangeEvent(event: any) {
    this.isChecked = event.checked;
  }

  public onSubmit() {
    if (this.reactiveForm.invalid) {
      return;
    }
    this.formData = this.reactiveForm.value;
    this.dialogRef.close({
      data: this.formData,
    });
  }

  private dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const today = new Date();

      if (!(control && control.value)) {
        return null;
      }

      return control.value < today
        ? { invalidDate: 'You cannot use past dates' }
        : null;
    };
  }
}
