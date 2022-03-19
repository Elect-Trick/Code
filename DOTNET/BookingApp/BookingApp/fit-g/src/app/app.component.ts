/* eslint-disable no-underscore-dangle */
import { User } from './models/user.model';
import { UsersService } from './services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private userService: UsersService) {}
  ngOnInit(): void {
this.userService.setCurrentUser();  }

}

