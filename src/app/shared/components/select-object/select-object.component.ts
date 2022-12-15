import {
  Component,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { WithName } from 'src/app/home/models/select-data';

@Component({
  selector: 'app-select-object',
  templateUrl: './select-object.component.html',
  styleUrls: ['./select-object.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectObjectComponent),
      multi: true
    }
  ]
})
export class SelectObjectComponent implements ControlValueAccessor {
  @ViewChild('nameInput') nameInput!: ElementRef;
  @Input('options') options!: WithName[];
  @Input('selectedOption') selectedOption!: WithName | null;
  @Output() itemSelected: EventEmitter<any> = new EventEmitter();

  public searchValue = '';
  public isOptionsShown = false;
  public val = '';

  set value(val: any) {
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  public onChange: any = () => {};

  public onTouch: any = () => {};

  public writeValue(value: any) {
    this.value = value;
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  public selectItem(currentOption: WithName): void {
    this.nameInput.nativeElement.value = '';
    this.isOptionsShown = false;
    this.options.filter((option: WithName) => {
      if (currentOption != option) option.isSelected = false;
    });
    currentOption.isSelected = !currentOption.isSelected;
    this.selectedOption = currentOption.isSelected ? currentOption : null;
  }

  public onKey(event: any) {
    this.searchValue = event.target.value;
  }
}
