import { MembersService } from 'src/app/Services/members.service';
import { AccountService } from './../Services/account.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  accountSub!: Subscription;
  model: any = {};
  // loggedIn: boolean=false;
  currentUser$: Observable<User> | undefined;

  constructor(
    public accountService: AccountService,
    private memberService: MembersService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnDestroy(): void {
    if (this.accountSub) {
      this.accountSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.accountService.currentUser$.subscribe((res) => {
      this.model.username = JSON.parse(res as any).username;
    });
  }

  login() {
    this.accountSub = this.accountService.login(this.model).subscribe(
      (response) => {
        if (response) {
          this.router.navigateByUrl('/members');


          // this.model = {};
        }


      },
      (error) => {
        this.toastr.error(error.error.errors);
      }
    );
  }

  logout() {
    this.accountService.logout();
    this.model = {};
    this.router.navigateByUrl('/');
  }
}
