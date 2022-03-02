import { PresenceService } from './../../Services/presence.service';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/Services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from './../../models/member.model';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input()member!: Member;
  constructor(
    private activatedRoute: ActivatedRoute,
    private memberService: MembersService,
    private toastr: ToastrService,
    public presenceService: PresenceService
  ) {}

  ngOnInit(): void {
    this.presenceService.onlineUsers$.pipe().subscribe(res=>{
    });
  }

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe((res) => {
      this.toastr.success('You have liked ' + member.knownAs);
    });
  }
}
