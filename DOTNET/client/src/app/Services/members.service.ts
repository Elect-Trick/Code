import { environment } from 'src/environments/environment';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from '../models/member.model';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MembersService implements OnInit {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  getMembers() {
    // Users is protected so we need add a header
    if (this.members.length > 0) {
      return of(this.members);
    } else {
      return this.http.get<Member[]>(this.baseUrl + 'users/').pipe(
        map((members) => {
          this.members = members;
          return this.members;
        })
      );
    }
  }

  getMember(username: string) {
    const member = this.members.find((z) => z.username == username);
    if (member != undefined) {
      return of(member);
    } else {
      return this.http.get<Member>(this.baseUrl + `users/${username}`);
    }
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(()=>{
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }
}
