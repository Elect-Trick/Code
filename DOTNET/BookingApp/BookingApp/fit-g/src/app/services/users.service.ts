import { User } from './../models/user.model';
/* eslint-disable @typescript-eslint/member-ordering */
import { Registration } from './../models/registration.model';
import { LoginModel } from './../models/login.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResetPassword } from '../models/reset-password.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  user!: User;
  baseUrl = environment.baseUrl;
  private currentUserSource = new ReplaySubject<any>(1);
  currentUser$ = this.currentUserSource.asObservable();

  // test$ = this.getResetToken().subscribe();
  constructor(private http: HttpClient) {}

  login(loginData: LoginModel) {
    console.log('Service', loginData);
    return this.http.post<User>(this.baseUrl + '/users/login', loginData).pipe(
      map((response: User) => {
        this.user = response;
        if (this.user) {
          localStorage.setItem('user', JSON.stringify(this.user));
          this.setCurrentUser();
          return this.user;
        }
      })
    );
  }

  register(registerationData: Registration) {
    return this.http.post(this.baseUrl + '/users/register', registerationData);
  }
  setCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('user')) as User;
    this.currentUserSource.next(currentUser);
  }

  resetPassword(resetData: ResetPassword) {
    return this.http.post(this.baseUrl + '/users/reset', resetData);
  }
  getResetToken() {
    return this.http
      .get(this.baseUrl + '/users/get-token')
      .subscribe((response) => {
        console.log('Was triggered in the FE');
      });
  }

  logout() {
    this.currentUserSource.next(null);
    localStorage.removeItem('user');
    this.user = null;
  }
}
