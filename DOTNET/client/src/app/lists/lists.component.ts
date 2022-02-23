import { PaginatedResult, Pagination } from './../models/pagination.model';
import { MembersService } from 'src/app/Services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member.model';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  members!:Member[];
  predicate = 'liked';
  pageNumber=1;
  pageSize = 5;
  pagination!: Pagination;
  constructor(private memberService: MembersService) {}

  ngOnInit(): void {}

  getLikes()
  {
    this.memberService.getLikes(this.predicate, this.pageNumber,this.pageSize).subscribe(res=>{
      this.members = (res.result);
      this.pagination = res.pagination;
    });
  }

  pageChanged(event:any)
  {
    this.pageNumber = event.page;
    this.getLikes();
  }
}
