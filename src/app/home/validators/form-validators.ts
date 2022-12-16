import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';

export const NameValidation = Validators.pattern('[a-zA-Z ]*');
export const PhoneValidation = Validators.pattern(
  /(\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4}))/
);
export const EmailValidation = Validators.pattern(
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
);

const checkInterval = (string: string): boolean => {
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
  if (calculateInterval(startHour, endHour, startMin, endMin) > 120) {
    return true;
  } else {
    return false;
  }
};

const calculateInterval = (
  startHour: number,
  endHour: number,
  startMin: number,
  endMin: number
): number => {
  return (endHour - startHour) * 60 + (endMin - startMin);
};

export const IntervalValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!(control && control.value)) {
      return null;
    }
    if (control.value.length < 16) {
      return null;
    }
    return checkInterval(control.value)
      ? { invalidDate: 'Invalid interval' }
      : null;
  };
};

const checkTime = (string: string, i: number): boolean => {
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
};

export const TimeValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!(control && control.value)) {
      return null;
    }
    if (control.value.length > 16) {
      return checkTime(control.value, 3)
        ? { invalidDate: 'Invalid time' }
        : null;
    } else
      return checkTime(control.value, 1)
        ? { invalidDate: 'Invalid time' }
        : null;
  };
};

const checkDate = (string: string): boolean => {
  const today = new Date();
  const date: Date = new Date(string.split(' ')[0]);
  if (date < today || date.toString() === 'Invalid Date') {
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
