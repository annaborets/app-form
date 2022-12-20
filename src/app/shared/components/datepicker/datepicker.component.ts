import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getDaysInMonth, addMonths, subMonths, startOfMonth } from 'date-fns';

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
  public daysOfCurrentMonth: number[] = [];
  public currentDate = new Date();
  public selectedDate = new Date();
  public visibleDate = new Date();
  public currentYear!: number;
  public currentMonth!: string;

  private onChange!: Function;
  private onTouch!: Function;

  constructor() {}

  ngOnInit(): void {
    this.setDaysOfMonth();
    this.setCurrentMonthAndYear();
    console.log(this.currentMonth);
    const result = startOfMonth(this.visibleDate);
    console.log(result);
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

  public selectDate(day: number): void {
    this.isOpen = false;
    this.selectedDate = new Date(this.visibleDate);
    this.selectedDate.setDate(day);
    console.log(this.selectedDate);
    console.log(this.selectedDate.getDay());
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
    this.daysOfCurrentMonth = [];
    for (let i = 1; i <= getDaysInMonth(this.visibleDate); i++) {
      this.daysOfCurrentMonth.push(i);
    }
    const firstDay = startOfMonth(this.visibleDate).getDay();
    let counter;

    if (firstDay === 0) {
      counter = 7;
    } else {
      counter = firstDay;
    }

    for (let i = 1; i < counter; i++) {
      this.daysOfCurrentMonth.unshift(0);
    }
  }

  private setCurrentMonthAndYear() {
    this.currentYear = this.visibleDate.getFullYear();
    this.currentMonth = MonthList[this.visibleDate.getMonth() + 1];
  }
}
