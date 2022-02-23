import { UserParams } from 'src/app/models/userParams.model';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../models/member.model';
import { of } from 'rxjs/internal/observable/of';
import { map, take } from 'rxjs/operators';
import { PaginatedResult } from '../models/pagination.model';
import { pipe } from 'rxjs';
import { User } from '../models/user.model';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MembersService implements OnInit {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  user!: User;
  userParams!: UserParams;
  // Map is commonly used to store something with a Key and  a Value
  memberCache = new Map();
  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>{
      this.user = user as User;
      this.userParams = new UserParams(user as User)
    });
  }

  ngOnInit(): void {}
  getMembers(userParams: UserParams) {
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }
    let params = getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender.toString());
    params = params.append('orderBy', userParams.orderBy);
    // Users is protected so we need add a header
    // Checks if there is a local copy of members before making the API call

    return getPaginatedResult<Member[]>(
      this.baseUrl + 'users',
      params,this.http
    ).pipe(
      map((response) => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  resetUserParams()
  {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getUserParams()
  {
    return this.userParams;
  }

  setUserParams(params:UserParams){
    this.userParams = params;
  }



  getMember(username: string) {
    const member = [...this.memberCache.values()]
      .reduce((source, elem) => source.concat(elem.result), [])
      .find((z: Member) => z.username == username);

    if (member) {
      return of(member);
    }
    return this.http
      .get<Member>(this.baseUrl + `users/${username}`)
      .pipe((response) => {
        return response;
      });
  }

  addLike(username : string){
    return this.http.post(this.baseUrl+'likes/'+username,{});
  }

  getLikes(predicate : string, pageNumber: number, pageSize:number)
  {
    let params = getPaginationHeaders(pageNumber,pageSize,);
    params = params.append('predicate',predicate);
   return getPaginatedResult<Member[]>(this.baseUrl+'likes',params,this.http).pipe(map(response=>{
     return response;
   }))
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }


}
