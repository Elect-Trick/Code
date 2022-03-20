import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Component, OnInit, Self } from '@angular/core';
import { Input } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() maxDate!: Date;

  // Partial means we dont have to provide all configuration options

  bsConfig!: Partial<BsDatepickerConfig>;
  // For age checking
  constructor(@Self() public ngControl: NgControl) {
    // To avoid injeting this from elsewhere in the dependancy tree
    this.ngControl.valueAccessor = this;

    this.bsConfig={
      containerClass: 'theme-red',
      dateInputFormat: 'DD MMMM YYYY',

    }
  }
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}

  ngOnInit(): void {}
}
