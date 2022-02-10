import { Member } from 'src/app/models/member.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from 'src/app/Services/members.service';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  member!: Member;

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  constructor(
    private memberService: MembersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  // We need the activated route in order to pass a paramter in our URL
  ngOnInit(): void {
    this.getMember();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
      // // max-width 800
      // {
      //   breakpoint: 800,
      //   width: '100%',
      //   height: '600px',
      //   imagePercent: 80,
      //   thumbnailsPercent: 20,
      //   thumbnailsMargin: 20,
      //   thumbnailMargin: 20,
      // },
      // // max-width 400
      // {
      //   breakpoint: 400,
      //   preview: false,
      // },
    ];
    // this.galleryImages = [
    //   {
    //     small: 'assets/img/gallery/1-small.jpeg',
    //     medium: 'assets/img/gallery/1-medium.jpeg',
    //     big: 'assets/img/gallery/1-big.jpeg',
    //   },
    //   {
    //     small: 'assets/img/gallery/2-small.jpeg',
    //     medium: 'assets/img/gallery/2-medium.jpeg',
    //     big: 'assets/img/gallery/2-big.jpeg',
    //   },
    //   {
    //     small: 'assets/img/gallery/3-small.jpeg',
    //     medium: 'assets/img/gallery/3-medium.jpeg',
    //     big: 'assets/img/gallery/3-big.jpeg',
    //   },
    //   {
    //     small: 'assets/img/gallery/4-small.jpeg',
    //     medium: 'assets/img/gallery/4-medium.jpeg',
    //     big: 'assets/img/gallery/4-big.jpeg',
    //   },
    //   {
    //     small: 'assets/img/gallery/5-small.jpeg',
    //     medium: 'assets/img/gallery/5-medium.jpeg',
    //     big: 'assets/img/gallery/5-big.jpeg',
    //   },
    // ];
  }

  getImages(): NgxGalleryImage[] {
    const galleryImages: NgxGalleryImage[] = [];
    for (let index = 0; index < this.member.photos.length; index++) {
      galleryImages.push({
        small: this.member.photoUrl,
        medium: this.member.photoUrl,
        big: this.member.photoUrl,
      });
    }
    return galleryImages;
  }

  getMember() {
    this.activatedRoute.paramMap.subscribe((paraMap) => {
      if (!paraMap.has('username')) {
        this.router.navigateByUrl('/not-found');
      } else {
        this.memberService
          .getMember(paraMap.get('username') as string)
          .subscribe((member) => {
            this.member = member;
            this.galleryImages = this.getImages();
          });
      }
    });
  }
}
