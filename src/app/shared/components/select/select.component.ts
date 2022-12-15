import {
  Component,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef
} from '@angular/core';

import { WithName } from 'src/app/home/models/select-data';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @ViewChild('nameInput') nameInput!: ElementRef;
  @Input('options') options!: WithName[];
  @Input('selectedOption') selectedOption!: WithName | null;
  @Output() itemSelected: EventEmitter<any> = new EventEmitter();
  public searchValue = '';
  public isOptionsShown = false;

  selectItem(currentOption: WithName): void {
    this.nameInput.nativeElement.value = '';
    this.isOptionsShown = false;
    this.options.filter((option: WithName) => {
      if (currentOption != option) option.isSelected = false;
    });
    currentOption.isSelected = !currentOption.isSelected;
    this.selectedOption = currentOption.isSelected ? currentOption : null;
  }

  onKey(event: any) {
    this.searchValue = event.target.value;
  }
}
