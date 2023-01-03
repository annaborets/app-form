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

enum MonthList {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

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
export class DatepickerComponent implements ControlValueAccessor, OnInit {
  @Input('isChecked') isChecked: boolean = false;
  public isOpen = false;
  public datesBeforeFirst: number[] = [];
  public readonly headers: string[] = [
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
  public selectedDate: Date | null = null;
  public selectedRange: DatepickerObject = {
    start: null,
    end: null
  };
  public visibleDate = startOfDay(new Date());
  public currentYear!: number;
  public currentMonth!: string;
  public datesWithinInterval: Date[] = [];
  public inputValue: string = '';

  private onChange!: Function;
  private onTouch!: Function;

  ngOnInit(): void {
    this.setDatesOfMonth();
    this.setCurrentMonthAndYear();
  }

  public writeValue(value: any) {
    this.isChecked ? (this.selectedRange = value) : (this.selectedDate = value);
  }

  public registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  public selectDate(date: Date): void {
    if (!this.isChecked) {
      this.selectedDate = date;
      this.isOpen = false;
      this.onChange(this.selectedDate);
    }
    if (this.isChecked && !this.selectedRange.start) {
      console.log('no start');
      this.selectedRange.start = date;
      console.log('end', this.selectedRange.end);
      return;
    }
    if (this.isChecked && this.selectedRange.start && !this.selectedRange.end) {
      console.log('here');
      this.selectedRange.end = date;
      this.selectedDate = null;
      this.isOpen = false;
      this.onChange(this.selectedRange);
      return;
    }
    if (this.isChecked && this.selectedRange.start && this.selectedRange.end) {
      console.log('hello');
      this.selectedRange.start = date;
      this.selectedRange.end = undefined;
      console.log('end', this.selectedRange.end);
      return;
    }
    console.log('range', this.selectedRange);
    this.setDatesWithinInterval(this.selectedRange);
    console.log('date', this.selectedDate);
    this.onTouch();
  }

  public previousMonth(): void {
    this.visibleDate = subMonths(this.visibleDate, 1);
    this.setDatesOfMonth();
    this.setCurrentMonthAndYear();
  }

  public nextMonth(): void {
    this.visibleDate = addMonths(this.visibleDate, 1);
    this.setDatesOfMonth();
    this.setCurrentMonthAndYear();
  }

  public isRangeContainsDate(date: Date): boolean {
    let stringsWithinInterval = this.datesWithinInterval.map((item) =>
      item.toString()
    );
    return stringsWithinInterval.includes(date.toString());
  }

  public onKey(event: any) {
    this.inputValue = event.target.value;
    console.log(event.target.value);
    this.transformStringToDate(this.inputValue);
  }

  public transformStringToDate(string: string) {
    if (string.length === 10) {
      this.selectedDate = new Date(string.split('/').reverse().join('/'));
      this.selectDate(this.selectedDate);
    }
    if (this.isChecked && string.length === 23) {
      let start = new Date(string.slice(0, 10).split('/').reverse().join('/'));
      this.selectDate(start);
      let end = new Date(string.slice(13, 23).split('/').reverse().join('/'));
      this.selectDate(end);
    }
  }

  private setDatesOfMonth(): void {
    this.datesOfCurrentMonth = eachDayOfInterval({
      start: startOfMonth(this.visibleDate),
      end: endOfMonth(this.visibleDate)
    });

    this.datesOfCurrentMonth.map((item) => {
      startOfDay(item);
    });

    const firstDate = startOfMonth(this.visibleDate).getDay();
    this.datesBeforeFirst = [];
    let numberOfdatesBeforeFirst;
    if (firstDate === 0) {
      numberOfdatesBeforeFirst = 7;
    } else {
      numberOfdatesBeforeFirst = firstDate;
    }

    for (let i = 1; i < numberOfdatesBeforeFirst; i++) {
      this.datesBeforeFirst.unshift(0);
    }
  }

  private setCurrentMonthAndYear() {
    this.currentYear = this.visibleDate.getFullYear();
    this.currentMonth = MonthList[this.visibleDate.getMonth() + 1];
  }

  private setDatesWithinInterval(range: DatepickerObject) {
    if (range.start && range.end) {
      this.datesWithinInterval = eachDayOfInterval({
        start: range.start,
        end: range.end
      });
      console.log(this.datesWithinInterval);
    }
  }
}
