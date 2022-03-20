import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AccountService } from './../../Services/account.service';
import { MembersService } from './../../Services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member.model';
import { AfterViewInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pagination } from 'src/app/models/pagination.model';
import { UserParams } from 'src/app/models/userParams.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit, OnDestroy {
  membersObs!: Subscription;
  members: Member[]=[];
  pagination!: Pagination;
  pageSize = 5;
  pageNumber = 1;
  userParams!: UserParams;
  user!: User;
  genderList = [{value:'male', display:'Males'},{value: 'female', display:'Females'}];

  mappedMembers: Member[] = [];
  constructor(
    private memberService: MembersService,
    private accountService: AccountService
  ) {

    this.userParams = this.memberService.getUserParams();
  }
  ngOnDestroy(): void {
    if (this.membersObs) {
      this.membersObs.unsubscribe();
    }
  }

  ngOnInit(): void {
    // this.getMember('park');
    this.getAllMembers();

  }

  resetFilters()
  {
    this.userParams  = this.memberService.resetUserParams();
    this.getAllMembers();
  }
  pageChanged(event : any) {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.getAllMembers();

  }

  getMember(username: string) {
    this.memberService.getMember('park').subscribe((response) => {
    });
  }
  getAllMembers() {

    this.memberService.setUserParams(this.userParams);
    this.memberService
      .getMembers(this.userParams)
      .subscribe((response) => {
        if(response)
        {
          this.members = response.result;
          this.pagination = response.pagination;
        }else{
          return;
        }

      });
  }
}
