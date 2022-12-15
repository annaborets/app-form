import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { SelectComponent } from './components/select/select.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [SelectComponent, FilterPipe],
  imports: [CommonModule, MatIconModule],
  exports: [SelectComponent],
})
export class SharedModule {}
