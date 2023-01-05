import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
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
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() selectedDate: Date | null = null;
  @Input() stringsWithinInterval: string[] = [];
  @Output() datePickedEvent = new EventEmitter<Date>();

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
  public displayedDate = startOfDay(new Date());
  // public datesWithinInterval: Date[] = [];

  constructor() {}

  ngOnInit(): void {
    this.setDatesOfMonth();
  }

  public pickDate(date: Date): void {
    this.datePickedEvent.emit(date);
  }

  public previousMonth(): void {
    this.displayedDate = subMonths(this.displayedDate, 1);
    this.setDatesOfMonth();
  }

  public nextMonth(): void {
    this.displayedDate = addMonths(this.displayedDate, 1);
    this.setDatesOfMonth();
  }

  // public isRangeContainsDate(date: Date): boolean {
  //   let stringsWithinInterval = this.datesWithinInterval.map((item) =>
  //     item.toString()
  //   );
  //   return stringsWithinInterval.includes(date.toString());
  // }

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
}
