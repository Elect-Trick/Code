import { Input,Self} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';


@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements ControlValueAccessor {
@Input() label!: string;
@Input() type='text';
  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }




}
