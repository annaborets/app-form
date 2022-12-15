import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FormData } from '../../models/form-data';
import { FormDialogComponent } from '../../components/form-dialog/form-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  public formData!: FormData;

  constructor(public dialog: MatDialog) {}

  public openDialog(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.formData = result.data;
    });
  }
}
