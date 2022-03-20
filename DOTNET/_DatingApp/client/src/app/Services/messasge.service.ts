import { BusyService } from './busy.service';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import * as signalR from '@microsoft/signalr';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root',
})
export class MessasgeService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;
  user!: User;
  hubConnection!: signalR.HubConnection;
  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  constructor(
    private http: HttpClient,
    private accoountService: AccountService,
    private busyService: BusyService
  ) {
    this.accoountService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }
  createHubConnection(user: User, otherUsername: string) {
    this.busyService.busy();
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
        accessTokenFactory: () => user.token,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

      // Returns a promise
    this.hubConnection.start().catch((error) => {

      console.log(error);
    }).finally(()=>{
      this.busyService.idle();
    });

    this.hubConnection.on('RecieveMessageThread', (messages) => {
      this.messageThreadSource.next(messages);
    });
     this.hubConnection.on('UpdatedGroup', (group:Group) => {
      //  Checks for unread messages
      if(group.connections.some(x=>x.username===otherUsername)){
        this.messageThread$.pipe(take(1)).subscribe(messages=>{
          messages.forEach(message=>{
            if(!message.dateRead){
              message.dateRead = new Date(Date.now())
            }
          })
          this.messageThreadSource.next([...messages]);
        })
      }
    });
    this.hubConnection.on('NewMessage', (_messages) => {
      this.messageThread$.pipe(take(1)).subscribe((messages)=>{
        // We will not mutate the messages, but instead we
this.messageThreadSource.next([...messages, _messages])
      });
    });
  }

  stopHubConnection() {
    if (this.hubConnection)
    {this.busyService.idle();
      this.hubConnection.stop();

    }
  }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    params = params.append('Username', this.user?.username);
    return getPaginatedResult<Message[]>(
      this.baseUrl + 'messages',
      params,
      this.http
    );
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(
      this.baseUrl + 'messages/thread/' + username
    );
  }
  async sendMessage(recipientUsername: string, content: string) {
    //We are returning a promise since Websockets are not http
   return this.hubConnection.invoke("SendMessage",{recipientUsername: recipientUsername, content}).catch(error=>{
     console.log(error);
   })
  }

  deleteMessage(id: number) {
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }
}
