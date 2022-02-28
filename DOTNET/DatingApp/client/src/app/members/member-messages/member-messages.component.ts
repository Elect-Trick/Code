import { ConfirmService } from './../../Services/confirm.service';
import { AccountService } from './../../Services/account.service';
import { NgForm } from '@angular/forms';
import { MembersService } from 'src/app/Services/members.service';
import { MessasgeService } from './../../Services/messasge.service';
import { Message } from './../../models/message.model';
import { ChangeDetectorRef, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AfterContentChecked,ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit, AfterContentChecked {
@Input() messages: Message[]=[];
@Input() username!: string;
user!: User;
@ViewChild('messageForm', {static: true}) messageForm!: NgForm;
messageContent! : string;
  constructor(private memberService : MembersService, public messageService : MessasgeService, private accountService: AccountService, private confirmService: ConfirmService, private changeDetector: ChangeDetectorRef) { }
  ngAfterContentChecked(): void {
 }

  ngOnInit(): void {

this.accountService.currentUser$.pipe(take(1)).subscribe(user=>
  {
    this.user = user

  });
  }

  sendMessage(){
    this.messageService.sendMessage(this.username, this.messageContent).then(() =>{
      // this.messages.push(message);
      this.messageForm.reset();
    });
  }




}





