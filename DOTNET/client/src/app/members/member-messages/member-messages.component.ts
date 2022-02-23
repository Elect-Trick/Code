import { NgForm } from '@angular/forms';
import { MembersService } from 'src/app/Services/members.service';
import { MessasgeService } from './../../Services/messasge.service';
import { Message } from './../../models/message.model';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
@Input() messages!: Message[];
@Input() username!: string;
@ViewChild('messageForm', {static: true}) messageForm!: NgForm;
messageContent! : string;
  constructor(private memberService : MembersService, private messageService : MessasgeService) { }

  ngOnInit(): void {
  }

  sendMessage(){
    this.messageService.sendMessage(this.username, this.messageContent).subscribe(message =>{
      this.messages.push(message);
      this.messageForm.reset();
    })
  }


}
