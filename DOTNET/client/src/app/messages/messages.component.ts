import { MembersService } from 'src/app/Services/members.service';
import { MessasgeService } from './../Services/messasge.service';
import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { Pagination } from '../models/pagination.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
messages : Message[]=[];
pagination! : Pagination;
container ="Unread";
pageNumber=1;
pageSize=5;
  constructor(private messageService: MessasgeService, private memberService: MembersService) { }

  ngOnInit(): void {
    this.memberService.getMember
    this.getMessages();
  }

  getMessages(){
    this.messageService.getMessages(this.pageNumber,this.pageSize,this.container).subscribe(messages=>{
      this.messages = messages.result;
      this.pagination = messages.pagination;
    });
  }

  pageChanged(event: any)
  {
    if(this.pageNumber !== event.page)
    {
      this.pageNumber = event.page;
      this.getMessages();
    }

  }
  deleteMessage(id: number){
    this.messageService.deleteMessage(id).subscribe(()=>{
      this.messages.splice(this.messages.findIndex(m=>m.id ==id),1);
    });
  }

}
