import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { eachDayOfInterval } from 'date-fns';

import { DatepickerObject } from 'src/app/home/models/datepicker-object';

@Component({
  selector: 'app-range-datepicker',
  templateUrl: './range-datepicker.component.html',
  styleUrls: ['./range-datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeDatepickerComponent),
      multi: true
    }
  ]
})
export class RangeDatepickerComponent implements ControlValueAccessor {
  public isOpen = false;
  public selectedRange: DatepickerObject = {
    start: null,
    end: null
  };
  public datesIntervalFormattedToStrings: string[] = [];
  public inputValue: string = '';

  private filledInputValue = 23;
  private onChange!: Function;
  private onTouch!: Function;

  public writeValue(value: any): void {
    this.selectedRange = value;
  }

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }

  public selectDate(date: Date): void {
    if (!this.selectedRange.start) {
      this.selectedRange.start = date;
      return;
    } else if (this.selectedRange.end) {
      this.selectedRange.start = date;
      this.selectedRange.end = null;
    } else {
      this.selectedRange.end = date;
      this.isOpen = false;
      this.onChange(this.selectedRange);
      this.setDatesWithinInterval(this.selectedRange);
      this.onTouch();
      return;
    }
  }

  public onInputValueChange(event: any): void {
    this.inputValue = event.target.value;
    this.formatInputValueToDate(this.inputValue);
  }

  public formatInputValueToDate(string: string): void {
    if (string.length !== this.filledInputValue) return;

    let start = new Date(
      string
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{4})/, '$3/$2/$1')
    );
    this.selectDate(start);
    let end = new Date(
      string
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})(\d{4})/, '$6/$5/$4')
    );
    this.selectDate(end);
  }

  private setDatesWithinInterval(range: DatepickerObject): void {
    let datesWithinInterval: Date[] = [];
    if (range.start && range.end) {
      datesWithinInterval = eachDayOfInterval({
        start: range.start,
        end: range.end
      });
    }

    this.datesIntervalFormattedToStrings = datesWithinInterval.map((item) =>
      item.toString()
    );
  }
}
