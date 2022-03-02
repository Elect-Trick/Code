import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  hubConnection!: signalR.HubConnection;

  private onlineUserSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUserSource.asObservable();

  constructor(private toastr: ToastrService, private router: Router) {}

  // Uses web sockets which do not support authentication headers
  createHubConnection(user: User) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        skipNegotiation: true,
        accessTokenFactory: () => user.token,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error));

    this.hubConnection.on('UserIsOnline', (username) => {
      this.onlineUsers$.pipe(take(1)).subscribe((usernames) => {
        this.onlineUserSource.next([...usernames, username]);
      });    });
    this.hubConnection.on('GetOnlineUsers', (username: string[]) => {
      this.onlineUserSource.next(username);
    });

    this.hubConnection.on('UserIsOffline', (username) => {
      this.onlineUsers$.pipe(take(1)).subscribe((usernames) => {
        this.onlineUserSource.next([...usernames.filter(x=>x !== username)]);
      });
    });
    this.hubConnection.on('NewMessageReceived', ({ username, knownAs }) => {
      this.toastr
        .info(knownAs + ' has sent you a messasge')
        .onTap.pipe(take(1))
        .subscribe(() => {
          this.router.navigateByUrl('/members/' + username + '?tab=3');
        });
    });
  }

  stopHubConnection() {
    this.hubConnection.stop().catch((error) => {
      console.log(error);
    });
  }
}
