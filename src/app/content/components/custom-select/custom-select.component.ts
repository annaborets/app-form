import {
  Component,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { WithName, WithNameArray } from '../../models/select-data';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
})
export class CustomSelectComponent {
  @ViewChild('nameInput') nameInput!: ElementRef;
  @Input('data') data!: WithNameArray;
  @Input('selectedItem') selectedItem!: WithName | null;
  @Output() itemSelected: EventEmitter<any> = new EventEmitter();
  public searchValue = '';
  public showMenuItems = false;

  selectItem(currentItem: WithName): void {
    this.nameInput.nativeElement.value = '';
    this.showMenuItems = false;
    this.data.filter((item: WithName) => {
      if (currentItem != item) item.isSelected = false;
    });
    currentItem.isSelected = !currentItem.isSelected;
    this.selectedItem = currentItem.isSelected ? currentItem : null;
  }

  onKey(event: any) {
    this.searchValue = event.target.value;
  }
}
