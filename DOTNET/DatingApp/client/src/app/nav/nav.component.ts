import { PresenceService } from './../Services/presence.service';
import { MemberEditComponent } from './../members/member-edit/member-edit.component';
import { PhotoEditorComponent } from './../members/photo-editor/photo-editor.component';
import { take, tap } from 'rxjs/operators';
import { MembersService } from 'src/app/Services/members.service';
import { AccountService } from './../Services/account.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from '../models/member.model';
import { ViewChild } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  accountSub!: Subscription;
  memberSub! : Subscription;
  member!: Member;
  model: any = {};
  user!: Member;
  // loggedIn: boolean=false;
  profilePic: any;
  knownAs!: string;
  currentUser$: Observable<User> | undefined;
  user2!: MemberEditComponent;


  constructor(
    public accountService: AccountService,
    private memberService: MembersService,
    private router: Router,
    private toastr: ToastrService,
    private presenceService: PresenceService
  ) {
   this.accountSub = this.accountService.currentUser$.subscribe((res) => {
      this.user = JSON.parse(res as any);
      if(this.user)
      { this.memberSub= this.memberService.getMember(this.user.username).subscribe((res:Member)=>{

          this.profilePic = res.photoUrl;
          this.knownAs = res.knownAs;
        });

      }



    });
  }

  ngOnDestroy(): void {
    if (this.accountSub) {
      this.accountSub.unsubscribe();
    }
  }

  ngOnInit() {
    console.log('Nav ran');

  }

  login() {
    this.accountSub = this.accountService.login(this.model).subscribe(
      (response) => {

        console.log("Login response",response);
        if (response) {
          this.router.navigateByUrl('/members');

          // this.model = {};
        }
      },
      (error) => {
        this.toastr.error(error.errors);
      }
    );
  }

  logout() {
    this.presenceService.stopHubConnection();
    this.accountService.logout();
    this.model = {};
    this.router.navigateByUrl('/');
  }
}
