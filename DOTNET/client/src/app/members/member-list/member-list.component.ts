import { MembersService } from './../../Services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member.model';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];
  mappedMembers: Member[] = [];
  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.getAllMembers();
    this.getMember('park');
  }

  getMember(username: string) {
    this.memberService.getMember('park').subscribe((response) => {
      console.log('Single Member', response);
    });
  }
  getAllMembers() {
    this.memberService.getMembers().subscribe((response) => {
      this.members.push(response as any);
      this.members = this.members.flat(1);
    });
  }
}
