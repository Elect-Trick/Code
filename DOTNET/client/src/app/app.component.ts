import { AccountService } from './Services/account.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any;
  constructor(private http: HttpClient, private accountService: AccountService) {}

  ngOnInit() {
    // this.accountService.getAllUsers().subscribe(users =>{
    //   console.log(users);
    // });
    this.setCurrentUser();

    // throw new Error('Method not implemented.');
  }

  setCurrentUser()
  {
    let user = localStorage.getItem('user') as unknown as User;
    this.accountService.setCurrentUser(user);
    console.log('Setting user',user);
  }


}
