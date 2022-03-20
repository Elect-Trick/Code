import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../Services/account.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {  Observable } from 'rxjs';
import { map, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GuardAuthGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}
  canActivate(): Observable<boolean> {
   return this.accountService.currentUser$.pipe(
     map(response=>{
       if(response)
       {
         return true as any;
       }
       this.toastr.error("You shall not pass");
     })
   )
  }
}
