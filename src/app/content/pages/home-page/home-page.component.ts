import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../../components/dialog/dialog.component';
import { FormData } from '../../models/form-data';
import { WithNameArray, WithName } from '../../models/select-data';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  public formData!: FormData;
  public dataList: WithNameArray = [
    {
      name: 'Item 1',
    },
    {
      name: 'Item 2',
    },
    {
      name: 'aaaa',
    },
    {
      name: 'bbb',
    },
  ];
  public selectedItem: WithName = {
    name: 'Item 1',
    isSelected: true,
  };

  constructor(public dialog: MatDialog) {}

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.formData = result.data;
      }
    });
  }
}
