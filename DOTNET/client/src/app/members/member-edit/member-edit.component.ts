import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../Services/account.service';
import { MembersService } from './../../Services/members.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Member } from 'src/app/models/member.model';
import { User } from 'src/app/models/user.model';
import { take } from 'rxjs/operators';
import { ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  member!: Member;
  user!: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    event: any
  ) {
    if (this.editForm.dirty) {
      event.returnValue = true;
    }
  }
  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      user = JSON.parse(user);
      this.user = user;
    });
    this.getMember();
  }

  ngOnInit(): void {}

  updateMember() {
    this.memberService.updateMember(this.member).subscribe((response) => {
      this.toastr.success('Profile Update Succesfully');
      this.editForm.reset(this.member);
    });
  }

  getMember() {
    this.memberService.getMember(this.user.username).subscribe((member) => {
      this.member = member;
    });
  }
}
