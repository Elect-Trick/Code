import { AccountService } from './../Services/account.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  registerMode = false;
  allUsers: any;

  constructor(private accountService: AccountService, private router: Router) {
    console.log('Home Constructor called');


    }
  ngOnDestroy(): void {

  }

  ngOnInit() {
      if(this.accountService.currentUser$){
        // window.location.reload();

    }
    else{
      return;

  }}

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegister(event: boolean) {
    this.registerMode = !!event;
  }
}
