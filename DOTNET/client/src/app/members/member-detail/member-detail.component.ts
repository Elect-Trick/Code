import { Member } from 'src/app/models/member.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from 'src/app/Services/members.service';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { ViewChild } from '@angular/core';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { MessasgeService } from 'src/app/Services/messasge.service';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  member!: Member;
@ViewChild('memberTabs',{static: true}) memberTabs!:  TabsetComponent;
activeTab!: TabDirective;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  messages: Message[]=[];
  constructor(
    private messageService: MessasgeService,
    private memberService: MembersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  // We need the activated route in order to pass a paramter in our URL
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data =>{
      this.member = data['member'];
    })

    this.activatedRoute.queryParams.subscribe(params =>{
      params['tab'] ? this.activateTab(params['tab']): this.activateTab(0)

    });
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
    this.galleryImages = this.getImages();


  }

  activateTab(tabId: number)
  {
    this.memberTabs.tabs[tabId].active =true;
  }

  onTabChange(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading ==="Messages" && this.messages.length===0)
    {
      this.getMessasges();
    }
  }
  getMessasges()
  {
    this.messageService.getMessageThread(this.member.username).subscribe(messages=>{
      this.messages = messages;

      console.log("Messages",this.messages);
    });
  }

  getImages(): NgxGalleryImage[] {

    // Adding images from the db to an array we will use in the front end.
    const galleryImages: NgxGalleryImage[] = [];
    for (let index = 0; index < this.member.photos.length; index++) {
      galleryImages.push({
        small: this.member.photos[index].url,
        medium: this.member.photos[index].url,
        big: this.member.photos[index].url,
      });
    }
    return galleryImages;
  }

  // getMember() {
  //   this.activatedRoute.paramMap.subscribe((paraMap) => {
  //     if (!paraMap.has('username')) {
  //       this.router.navigateByUrl('/not-found');
  //     } else {
  //       this.memberService
  //         .getMember(paraMap.get('username') as string)
  //         .subscribe((member) => {
  //           this.member = member as Member;
  //         });
  //     }
  //   });
  // }
}
