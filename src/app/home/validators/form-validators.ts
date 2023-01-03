import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';

export const NameValidation = Validators.pattern('[a-zA-Z ]*');
export const PhoneValidation = Validators.pattern(
  /(\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4}))/
);
export const EmailValidation = Validators.pattern(
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
);

const checkDate = (date: Date): boolean => {
  const today = new Date();

  if (date < today) {
    return true;
  } else {
    return false;
  }
};

export const DateValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!(control && control.value)) {
      return null;
    }

    return checkDate(control.value) ? { invalidDate: 'Invalid date' } : null;
  };
};

export const DateRangeValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!(control && control.value)) {
      return null;
    }

    return checkDate(control.value.start)
      ? { invalidDate: 'Invalid date' }
      : null;
  };
};
