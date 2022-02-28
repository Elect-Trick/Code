import { ToastrService } from 'ngx-toastr';
import { NavComponent } from './../../nav/nav.component';
import { MembersService } from 'src/app/Services/members.service';
import { AccountService } from './../../Services/account.service';
import { environment } from 'src/environments/environment';
import { Member } from 'src/app/models/member.model';
import { Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { User } from 'src/app/models/user.model';
import { take, tap } from 'rxjs/operators';
import { Photo } from 'src/app/models/photo.model';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() member!: Member;
  @Input() member2! : NavComponent;
  @Output() test! : Member;
  uploader!: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user!: User;
  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
   private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(tap()).subscribe((_user) => {
      this.user = JSON.parse(_user);
    });

    this.configureUploader();
    this.uploader.onBeforeUploadItem = (file) => {
      // No need to send credentials as we are sending these with the file
      file.withCredentials = false;
    };

  }
  // We need to set the dropzone inside the template
  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  async deletePhoto(photo: Photo)
  {
    this.accountService.deletePhoto(photo.id).subscribe(response=>{
      if(response)
      {
       this.member.photos = this.member.photos.filter(z=>z.id !=photo.id);
       this.toastrService.success("Photo successfully deleted")
      }
      else{
        this.toastrService.error("Something went wrong");
      }
    });
  }

  async setMainPhoto(photo: Photo) {

    this.accountService.setMainPhoto(photo.id).subscribe((response) => {
      this.user.photoUrl = photo.url;
      this.member.photoUrl = photo.url;
      this.member.photos.forEach((p) => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      });
this.memberService.updateMember(this.member);
this.accountService.setCurrentUser(this.user);
  });
  }

  configureUploader() {

    this.uploader = new FileUploader({
      url: `${this.baseUrl}users/add-photo`,
      authToken: `Bearer ${this.user.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
      // 10Mb for the free tier cloudinary

    });


    // Popualate the photo array after a sucessful upload
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        let photo = JSON.parse(response);
        photo.isMain = false;
        this.member.photos.push(photo);
      }
    };

  }
}
