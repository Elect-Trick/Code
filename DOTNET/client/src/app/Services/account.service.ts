import { User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

// Services uses the singleTOn pattern, it is only destroyed when we leave the page
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:5001/api/";
  private currentUserSource = new ReplaySubject<any>(1)
currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  login(loginData: any)
  {
    return this.http.post<User>(this.baseUrl+'account/login', loginData).pipe(
      map((response: User) =>{
        const user= response;
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;

      })
    );
  }

  register(registrationData: any)
  {
    return this.http.post<User>(this.baseUrl+'account/register',registrationData).pipe(
      map((user:User)=>{

        console.log('User is ', user)
        if(user)
        {
        localStorage.setItem('user', JSON.stringify(user));
         this.currentUserSource.next(user);

        }
return user;

      }

    ));

  }

  async getAllUsers()
  {
   return await this.http.get<User[]>(this.baseUrl+'users');

  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout()
  {
   let user: User;
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
