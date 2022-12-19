import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';

import { SelectObjectComponent } from './components/select-object/select-object.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [SelectObjectComponent, FilterPipe],
  imports: [CommonModule, MatIconModule, OverlayModule],
  exports: [SelectObjectComponent]
})
export class SharedModule {}
