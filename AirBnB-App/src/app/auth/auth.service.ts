/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'protractor';
import { throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userAuthenticated: boolean;
  private userId = null;
  private _err: HttpErrorResponse;

  constructor(private http: HttpClient) {}

  get userIsAuthenticated() {
    return this.userAuthenticated;
  }
  get getUserId() {
    return this.userId;
  }
  signIn(_email: string, _password: string) {
    return this.http
      .post<LoginData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDD-_1n4kk6Ep2f74lX84_5mAUvc4KuN5E',
        { email: _email, password: _password, returnSecureToken: true }
      ).pipe(tap(response=>{

        this.userAuthenticated = true;
      })
      );

  }

  signUp(_email: string, _password: string) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDD-_1n4kk6Ep2f74lX84_5mAUvc4KuN5E',
        {
          email: _email,
          password: _password,
          returnSecureToken: true,

        }
      )
      .pipe(
        tap((response) => {
          console.log('After Signup', response);
          return response;
        })
      );
  }

  signOut() {
    this.userAuthenticated = false;
  }
}

interface LoginData {
  kind: string;
  localId: string;
  displayName: string;
  email: string;
  idToken: string;
  refreshToken: string;
  registered: boolean;
  expiresIn: number;
  message: string;
}
