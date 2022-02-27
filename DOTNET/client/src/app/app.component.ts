import { PresenceService } from './Services/presence.service';
import { AccountService } from './Services/account.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OnInit, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { User } from './models/user.model';
import { take } from 'rxjs/operators';
import { Input } from '@angular/core';
import { Member } from './models/member.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'The Dating App';
  user!: User;

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private presenceService: PresenceService
  ) {
    console.log("App construct");
  }
  ngOnDestroy(): void {
    this.accountService.setCurrentUser("" as any);
  }

  ngOnInit() {
    console.log("Rppt comp ran");
    this.setCurrentUser();
  }

  setCurrentUser() {

    const _user = (localStorage.getItem('user')) ;
    if(_user)
    {
      this.accountService.setCurrentUser(_user);
      console.log('Type',typeof(JSON.parse(_user)));
      this.presenceService.createHubConnection(JSON.parse(_user));

    }
  }
}
