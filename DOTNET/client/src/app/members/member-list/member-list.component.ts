import { Observable } from 'rxjs';
import { AccountService } from './../../Services/account.service';
import { MembersService } from './../../Services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member.model';
import { AfterViewInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit, OnDestroy {
  membersObs! : Subscription;
  members$!: Observable<Member[]>;
  mappedMembers: Member[] = [];
  constructor(private memberService: MembersService, private accountService :AccountService) {}
  ngOnDestroy(): void {
if(this.membersObs)
{
  this.membersObs.unsubscribe();
}  }



  ngOnInit(): void {
   console.log('Current User in members is',this.accountService.currentUser$)
    // this.getMember('park');
    this.members$ = this.memberService.getMembers();

  }



  getMember(username: string) {
   this.memberService.getMember('park').subscribe((response) => {
      console.log('Single Member', response);
    });
  }
  // getAllMembers() {
  // this.membersObs=  this.memberService.getMembers().subscribe((response) => {
  //     this.members.push(response as any);
  //     this.members = this.members.flat(1);
  //   });
  // }
}
