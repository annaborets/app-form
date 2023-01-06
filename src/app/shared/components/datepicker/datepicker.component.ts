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

  private onChange!: Function;
  private onTouch!: Function;

  public writeValue(value: Date) {
    this.selectedDate = value;
  }

  public registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  public selectDate(date: Date): void {
    this.selectedDate = date;
    this.isOpen = false;
    this.onChange(this.selectedDate);
  }

  public onKey(event: any) {
    this.inputValue = event.target.value;
    this.formatStringToDate(this.inputValue);
  }

  private formatStringToDate(string: string) {
    if (string.length !== 10) return;

    this.selectedDate = new Date(
      string.replace(/\D+/g, '').replace(/(\d{2})(\d{2})(\d{4})/, '$3/$2/$1')
    );
    this.selectDate(this.selectedDate);
  }
}
