import { User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

// Services uses the singleTOn pattern, it is only destroyed when we leave the page
@Injectable({
  providedIn: 'root',
})
export class AccountService implements OnDestroy {
  // Anuglar will auto detect the environment and use the relevant environment
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<any>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) {}
  ngOnDestroy(): void {
    if (this.currentUser$) {
      this.currentUserSource.next(null);
    }
  }

  login(loginData: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', loginData).pipe(
      map((response: User) => {
        const user = response;
        console.log('response has', response);
        if (user) {
          const _user = localStorage.setItem(
            'user',
            JSON.stringify(user as User)
          );
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  register(registrationData: any) {
    return this.http
      .post<User>(this.baseUrl + 'account/register', registrationData)
      .pipe(
        map((user: User) => {
          if (user) {
            const _user = localStorage.setItem(
              'user',
              JSON.stringify(user as User)
            );
            this.setCurrentUser(user);
          }
          return user;
        })
      );
  }

  async getAllUsers() {
    return await this.http.get<User[]>(this.baseUrl + 'users');
  }

  setCurrentUser(user: any) {
    const _user = localStorage.getItem('user');
    this.currentUserSource.next(_user);
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }
  deletePhoto(photoId: number) {
    return this.http.delete<boolean>(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  logout() {
    localStorage.removeItem('user');
    this.setCurrentUser(null);
  }
}
