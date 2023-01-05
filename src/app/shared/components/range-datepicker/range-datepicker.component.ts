import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfDay
} from 'date-fns';

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
export class RangeDatepickerComponent implements ControlValueAccessor, OnInit {
  public isOpen = false;
  public datesBeforeFirst: number[] = [];
  public readonly daysOfWeek: string[] = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
  ];
  public datesOfCurrentMonth: Date[] = [];
  public currentDate = startOfDay(new Date());
  public selectedRange: DatepickerObject = {
    start: null,
    end: null
  };
  public displayedDate = startOfDay(new Date());
  public datesWithinInterval: Date[] = [];
  public inputValue: string = '';

  private onChange!: Function;
  private onTouch!: Function;

  ngOnInit(): void {
    this.setDatesOfMonth();
  }

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
      this.selectedRange.end = undefined;
      this.setDatesWithinInterval(this.selectedRange);
      this.onTouch();
    }
  }

  public previousMonth(): void {
    this.displayedDate = subMonths(this.displayedDate, 1);
    this.setDatesOfMonth();
  }

  public nextMonth(): void {
    this.displayedDate = addMonths(this.displayedDate, 1);
    this.setDatesOfMonth();
  }

  public isRangeContainsDate(date: Date): boolean {
    let stringsWithinInterval = this.datesWithinInterval.map((item) =>
      item.toString()
    );
    return stringsWithinInterval.includes(date.toString());
  }

  public onKey(event: any) {
    this.inputValue = event.target.value;
    this.formatStringToDate(this.inputValue);
  }

  public formatStringToDate(string: string) {
    if (string.length !== 23) return;

    let start = new Date(string.slice(0, 10).split('/').reverse().join('/'));
    this.selectDate(start);
    let end = new Date(string.slice(13, 23).split('/').reverse().join('/'));
    this.selectDate(end);
  }

  private setDatesOfMonth(): void {
    this.datesOfCurrentMonth = eachDayOfInterval({
      start: startOfMonth(this.displayedDate),
      end: endOfMonth(this.displayedDate)
    });

    const firstDate = startOfMonth(this.displayedDate).getDay();
    let numberOfdatesBeforeFirst;
    if (firstDate === 0) {
      numberOfdatesBeforeFirst = 7;
    } else {
      numberOfdatesBeforeFirst = firstDate;
    }

    this.datesBeforeFirst = Array(numberOfdatesBeforeFirst - 1).fill(0);
  }

  private setDatesWithinInterval(range: DatepickerObject) {
    if (range.start && range.end) {
      this.datesWithinInterval = eachDayOfInterval({
        start: range.start,
        end: range.end
      });
    }
  }
}
