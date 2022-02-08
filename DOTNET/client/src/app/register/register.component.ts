import { User } from './../models/user.model';
import { AccountService } from './../Services/account.service';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegistration = new EventEmitter();
  model: any = {};
  registrationForm = new FormGroup({
    username: new FormControl('',{ updateOn: 'change',validators:[
      Validators.required,
      Validators.minLength(2)],
    }),
     password : new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required, Validators.minLength(2)],
    }),

  });

  constructor(private accountService: AccountService, private toastr: ToastrService) {


  }

  ngOnInit(): void {

    console.log(this.usersFromHomeComponent);
  }

  register() {
    if(this.registrationForm.valid){
      this.accountService.register(this.model).subscribe(response =>{
        console.log(response);
        this.cancel();
      },error =>{
        console.log(error);
        this.toastr.error(error.error);
      })
    }
    else{
      alert("The form is not valid");
    }
  }

  cancel() {
    console.log('cancelled');

    this.cancelRegistration.emit(false);
  }
}
