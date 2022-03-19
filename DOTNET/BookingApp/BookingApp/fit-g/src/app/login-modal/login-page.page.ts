import { UsersService } from './../services/users.service';
import { LoginModel } from './../models/login.model';
/* eslint-disable @typescript-eslint/member-ordering */
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  @ViewChild('m')
  form!: FormGroup;
  user: LoginModel = {
    username: '',
    password: '',
  };

  constructor(private usersService: UsersService, private router: Router) {}
  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): FormGroup {
    return (this.form = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
      }
      // PasswordValidator.passwordMatchingValidatior
    ));
  }
  onClick() {}

  login() {
    if (!this.form.valid) {
      alert('Form is not complete');
    } else {
      console.log('FC', this.form.controls.username.value);
      this.user.username = this.form.controls.username.value;
      this.user.password = this.form.controls.password.value;
      this.usersService.login(this.user).subscribe(
        (response) => {
          this.router.navigateByUrl('tabs');
        },
        (error) => {
          alert(`Error: ${error}`);
        }
      );
    }
  }
}
