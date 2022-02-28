import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../Services/account.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {  Observable } from 'rxjs';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private toastr: ToastrService,
    private accountService: AccountService,
    private router: Router
  ) {}
  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(map(user =>{
      user = JSON.parse(user);
      if(user?.roles.includes('Admin')|| user?.roles.includes('Moderator'))
      return true as any;

      this.toastr.error('You cannot enter this area');
      this.router.navigateByUrl('/members');


    }));
  }
}
