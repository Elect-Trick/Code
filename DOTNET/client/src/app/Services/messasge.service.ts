import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class MessasgeService {
  baseUrl = environment.apiUrl;
  user!:User;

  constructor(private http: HttpClient, private accoountService:  AccountService) {
    this.accoountService.currentUser$.subscribe(user=>{
      this.user = user;
    })

  }

  getMessages(
    pageNumber: number,
    pageSize: number,
    container: string,
  ) {
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
  sendMessage(recipientUsername: string, content: string) {
    return this.http.post<Message>(this.baseUrl + 'messages', {
      recipientUsername: recipientUsername,
      content,
    });
  }

  deleteMessage(id: number){
    return this.http.delete(this.baseUrl+'messages/'+id);
  }
}
