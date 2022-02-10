import { environment } from 'src/environments/environment';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MembersService implements OnInit {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  getMembers() {
    // Users is protected so we need add a header
    return this.http.get<Member[]>(this.baseUrl + 'users/');
  }

  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + `users/${username}`);
  }
}
