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

  private onChange!: Function;
  private onTouch!: Function;

  public writeValue(value: any) {
    this.selectedRange = value;
  }

  public registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  public selectDate(date: Date): void {
    if (!this.selectedRange.start) {
      this.selectedRange.start = date;
      return;
    }

    if (this.selectedRange.start && !this.selectedRange.end) {
      this.selectedRange.end = date;
      this.isOpen = false;
      this.onChange(this.selectedRange);
      this.setDatesWithinInterval(this.selectedRange);
      this.onTouch();
      return;
    }

    if (this.selectedRange.start && this.selectedRange.end) {
      this.selectedRange.start = date;
      this.selectedRange.end = null;
    }
  }

  public onKey(event: any) {
    this.inputValue = event.target.value;
    this.formatStringToDate(this.inputValue);
  }

  public formatStringToDate(string: string) {
    if (string.length !== 23) return;

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

  private setDatesWithinInterval(range: DatepickerObject) {
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
