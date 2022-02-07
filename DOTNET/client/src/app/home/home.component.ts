import { AccountService } from './../Services/account.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  allUsers: any;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.getUsers();
  }
  async getUsers() {
    (await this.accountService.getAllUsers()).subscribe((users: User[]) => {
      this.allUsers = users;
    });
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegister(event: boolean) {
    this.registerMode = !!event;
  }
}
