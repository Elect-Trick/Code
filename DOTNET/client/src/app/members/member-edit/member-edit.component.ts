import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../Services/account.service';
import { MembersService } from './../../Services/members.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Member } from 'src/app/models/member.model';
import { User } from 'src/app/models/user.model';
import { take, tap } from 'rxjs/operators';
import { ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { HostListener } from '@angular/core';
import { Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm!: NgForm;
  @Input() test! :Member;

  member!: Member;
  user: User ={
    username: '',
    token: '',
    photoUrl: ''
  };
  accountSub! :Subscription;
  memberSub! :Subscription;
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
   this.accountSub = this.accountService.currentUser$.pipe().subscribe((user) => {
      user = JSON.parse(user);
      this.user = user;
    });
    this.getMember();


  }
  ngOnDestroy(): void {
if(this.memberSub){
  this.memberSub.unsubscribe();
}  }

  ngOnInit(): void {
    console.log("Member edit done");

  }

  updateMember() {
  this.memberSub=  this.memberService.updateMember(this.member).subscribe((response) => {
      this.toastr.success('Profile Update Succesfully');
      this.editForm.reset(this.member);
    });
  }

  getMember() {
   this.memberSub= this.memberService.getMember(this.user.username).subscribe((member) => {
      this.member = member as Member;
    });
  }
}
