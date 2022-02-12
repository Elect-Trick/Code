import { AccountService } from './../Services/account.service';
import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor, OnDestroy {
  constructor(private accountService: AccountService) {}
  ngOnDestroy() {
    if (this.accountService.currentUser$) {
      this.accountService.currentUser$ = null as any;
    }
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let currentUser: User;
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      currentUser = user;
      currentUser = JSON.parse(currentUser as any);
      if (currentUser) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
      }
    });

    return next.handle(request);
  }
}
