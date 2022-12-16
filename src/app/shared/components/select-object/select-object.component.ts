import {
  Component,
  Input,
  EventEmitter,
  Output,
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
  @Input('options') options!: WithName[];
  @Output() itemSelected: EventEmitter<any> = new EventEmitter();

  public searchValue = '';
  public isOptionsShown = false;
  public inputValue!: WithName;

  set value(val: any) {
    if (val !== undefined && this.inputValue !== val) {
      this.inputValue = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  public onChange: any = () => {};

  public onTouch: any = () => {};

  public writeValue(value: WithName) {
    this.value = value;
    this.isOptionsShown = false;
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  public onKey(event: KeyboardEvent) {
    this.searchValue = (event.target as HTMLInputElement).value;
  }
}
