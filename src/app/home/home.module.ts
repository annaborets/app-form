import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { SetDirective } from './directives/set.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomePageComponent, FormDialogComponent, SetDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    NgxMaskModule.forRoot(),
    SharedModule
  ],
  exports: [HomePageComponent]
})
export class HomeModule {}
