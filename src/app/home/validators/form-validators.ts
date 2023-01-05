import { Validators } from '@angular/forms';

export const NameValidation = Validators.pattern('[a-zA-Z ]*');
export const PhoneValidation = Validators.pattern(
  /(\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4}))/
);
export const EmailValidation = Validators.pattern(
  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
);
