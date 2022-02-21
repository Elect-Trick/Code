import { Router } from '@angular/router';
import { PasswordValidator } from './password-validator';
import { Observable } from 'rxjs';
import { User } from './../models/user.model';
import { AccountService } from './../Services/account.service';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  MinLengthValidator,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationmForm!: FormGroup;
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegistration = new EventEmitter();
  model: any = {};
  registrationForm!: FormGroup;
  maxDate!: Date;
  validationErros!: string[];
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    // Checking if you are older than 18
    this.maxDate.setFullYear(this.maxDate.getFullYear() -19);


  }

  initializeForm(): FormGroup {
    return (this.registrationForm = new FormGroup(
      {
        gender: new FormControl('male', [
          Validators.required,

        ]),
        knownAs: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        dateOfBirth: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        city: new FormControl('', [
          Validators.required,
        ]),
        country: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
        ]),
        confirm: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
        ]),
      },
      PasswordValidator.passwordMatchingValidatior
    ));
  }

  // Custom Validator which dynamically adds the validators
  // Adding them in the create method results in an unfufilled promise and error
  register() {
    if (this.registrationForm.valid) {
      this.accountService.register(this.registrationForm.value).subscribe(
        response => {
             this.router.navigateByUrl('/members');
          this.toastr.success("Success, return to login");

        },
        (error) => {
          console.log('Errors',error);
          this.validationErros = error;
          this.toastr.error(error.error);
        }
      );
    } else {
      alert('The form is not valid');
    }
  }

  cancel() {
    console.log('cancelled');

    this.cancelRegistration.emit(false);
  }
}
