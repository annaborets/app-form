import { Component, Input, forwardRef } from '@angular/core';
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
  @Input('options') options: WithName[] = [];
  @Input('placeholder') placeholder = '';

  public searchValue = '';
  public isOptionsShown = false;
  public value!: WithName;

  private onChange!: Function;
  private onTouch!: Function;

  public writeValue(value: WithName) {
    this.value = value;
  }

  public registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  public selectOption(value: WithName) {
    this.value = value;
    this.isOptionsShown = false;
    this.onTouch();
    this.onChange(value);
  }

  public onKey(event: KeyboardEvent) {
    this.searchValue = (event.target as HTMLInputElement).value;
  }
}
