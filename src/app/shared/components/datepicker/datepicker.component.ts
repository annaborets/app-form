import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfDay
} from 'date-fns';

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
  public isOpen = false;
  public headers: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public datesOfCurrentMonth: Date[] = [];
  public currentDate = startOfDay(new Date());
  public selectedDate!: Date;
  public visibleDate = startOfDay(new Date());
  public currentYear!: number;
  public currentMonth!: string;

  private onChange!: Function;
  private onTouch!: Function;

  ngOnInit(): void {
    this.setDaysOfMonth();
    this.setCurrentMonthAndYear();
  }

  public writeValue(value: any) {
    this.selectedDate = value;
  }

  public registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  public selectDate(day: Date): void {
    this.selectedDate = day;
    this.isOpen = false;
    this.onTouch();
    this.onChange(day);
  }

  public previousMonth(): void {
    this.visibleDate = subMonths(this.visibleDate, 1);
    this.setDaysOfMonth();
    this.setCurrentMonthAndYear();
  }

  public nextMonth(): void {
    this.visibleDate = addMonths(this.visibleDate, 1);
    this.setDaysOfMonth();
    this.setCurrentMonthAndYear();
  }

  private setDaysOfMonth(): void {
    this.datesOfCurrentMonth = eachDayOfInterval({
      start: startOfMonth(this.visibleDate),
      end: endOfMonth(this.visibleDate)
    });

    this.datesOfCurrentMonth.map((item) => {
      startOfDay(item);
    });

    const firstDay = startOfMonth(this.visibleDate).getDay();
    let daysBeforeFirst;
    if (firstDay === 0) {
      daysBeforeFirst = 7;
    } else {
      daysBeforeFirst = firstDay;
    }

    for (let i = 1; i < daysBeforeFirst; i++) {
      this.datesOfCurrentMonth.unshift(new Date(''));
    }
  }

  private setCurrentMonthAndYear() {
    this.currentYear = this.visibleDate.getFullYear();
    this.currentMonth = MonthList[this.visibleDate.getMonth() + 1];
  }
}
