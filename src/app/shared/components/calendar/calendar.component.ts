import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfDay
} from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() selectedDate: Date | null = null;
  @Input() datesIntervalFormattedToStrings: string[] = [];
  @Output() datePickedEvent = new EventEmitter<Date>();

  public readonly daysOfWeek: string[] = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
  ];
  public datesBeforeFirst: number[] = [];
  public datesOfCurrentMonth: Date[] = [];
  public currentDate = startOfDay(new Date());
  public displayedDate = startOfDay(new Date());

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

  public checkIfDateFirst(date: Date): boolean {
    return this.datesIntervalFormattedToStrings.indexOf(date.toString()) === 0;
  }

  public checkIfDateLast(date: Date): boolean {
    return (
      this.datesIntervalFormattedToStrings.indexOf(date.toString()) ===
      this.datesIntervalFormattedToStrings.length - 1
    );
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
