import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SelectObjectComponent } from './components/select-object/select-object.component';
import { FilterPipe } from './pipes/filter.pipe';
import { DatepickerComponent } from './components/datepicker/datepicker.component';

@NgModule({
  declarations: [SelectObjectComponent, FilterPipe, DatepickerComponent],
  imports: [
    CommonModule,
    MatIconModule,
    OverlayModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [SelectObjectComponent, DatepickerComponent]
})
export class SharedModule {}
