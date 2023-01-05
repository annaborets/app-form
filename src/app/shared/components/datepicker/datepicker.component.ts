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
  public selectedDate: Date | null = null;
  public displayedDate = startOfDay(new Date());
  public inputValue: string = '';

  private onChange!: Function;
  private onTouch!: Function;

  ngOnInit(): void {
    this.setDatesOfMonth();
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

  public selectDate(date: Date): void {
    this.selectedDate = date;
    this.isOpen = false;
    this.onChange(this.selectedDate);
  }

  public previousMonth(): void {
    this.displayedDate = subMonths(this.displayedDate, 1);
    this.setDatesOfMonth();
  }

  public nextMonth(): void {
    this.displayedDate = addMonths(this.displayedDate, 1);
    this.setDatesOfMonth();
  }

  public onKey(event: any) {
    this.inputValue = event.target.value;
    this.formatStringToDate(this.inputValue);
  }

  public formatStringToDate(string: string) {
    if (string.length !== 10) return;

    this.selectedDate = new Date(string.split('/').reverse().join('/'));
    this.selectDate(this.selectedDate);
  }

  private setDatesOfMonth(): void {
    this.datesOfCurrentMonth = eachDayOfInterval({
      start: startOfMonth(this.displayedDate),
      end: endOfMonth(this.displayedDate)
    });

    const firstDate = startOfMonth(this.displayedDate).getDay();
    let numberOfdatesBeforeFirst;
    if (firstDate === 0) {
      numberOfdatesBeforeFirst = 6;
    } else {
      numberOfdatesBeforeFirst = firstDate - 1;
    }

    this.datesBeforeFirst = Array(numberOfdatesBeforeFirst).fill(0);
  }
}
