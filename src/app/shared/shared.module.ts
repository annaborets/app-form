import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectObjectComponent } from './components/select-object/select-object.component';
import { FilterPipe } from './pipes/filter.pipe';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { RangeDatepickerComponent } from './components/range-datepicker/range-datepicker.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [
    SelectObjectComponent,
    FilterPipe,
    DatepickerComponent,
    RangeDatepickerComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    OverlayModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SelectObjectComponent,
    DatepickerComponent,
    RangeDatepickerComponent
  ]
})
export class SharedModule {}
