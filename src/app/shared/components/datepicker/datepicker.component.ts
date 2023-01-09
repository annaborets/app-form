import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent implements ControlValueAccessor {
  public isOpen = false;
  public selectedDate: Date | null = null;
  public inputValue: string = '';

  private filledInputValue = 10;
  private onChange!: Function;
  private onTouch!: Function;

  public writeValue(value: Date): void {
    this.selectedDate = value;
  }

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }

  public selectDate(date: Date): void {
    this.selectedDate = date;
    this.isOpen = false;
    this.onChange(this.selectedDate);
  }

  public onInputValueChange(event: any): void {
    this.inputValue = event.target.value;
    this.formatInputValueToDate(this.inputValue);
  }

  private formatInputValueToDate(string: string): void {
    if (string.length !== this.filledInputValue) return;

    this.selectedDate = new Date(
      string.replace(/\D+/g, '').replace(/(\d{2})(\d{2})(\d{4})/, '$3/$2/$1')
    );
    this.selectDate(this.selectedDate);
  }
}
