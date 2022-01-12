import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private userAuthenticated = true;
private userId ='abc';
  constructor() { }

  get userIsAuthenticated()
  {
return this.userAuthenticated;
  }
  get getUserId()
  {
    return this.userId;
  }
  signIn()
  {
    this.userAuthenticated = true;
  }

  signOut()
  {this.userAuthenticated = false;}


}
