import { FormControl } from '@angular/forms';
import { Input } from '@angular/core';
import { Self } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor {
// We are implementing a control value accessor

@Input() label!: string;
// @Input() formControl!: FormControl;
@Input() type = 'text';

  constructor(@Self() public ngControl :NgControl) {

    this.ngControl.valueAccessor =this;
  }
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }


}
