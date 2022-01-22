import { OnDestroy } from '@angular/core';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Place } from '../../places.model';
import { PlacesService } from '../../places.service';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {
  Camera,
  CameraResultType,
  GalleryPhoto,
  GalleryPhotos,
} from '@capacitor/camera';
import { Encoding, Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit, OnDestroy {
  images: GalleryPhotos[] = [];
  place: Place = {
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    price: 0,
    startDate: undefined,
    endDate: undefined,
    userID: '',
  };
  form: FormGroup;
  startDate: Date;
  endDate: Date;
  _start: Date;
  formatedStartDate: string;
  formatedEndDate: string;
  endDateSelected: boolean;
  startDateSelected: boolean;
  selectedEndDate: Date;
  isLoading: boolean;
  placesSub: Subscription;
  constructor(
    private placeService: PlacesService,
    private routerService: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {}
  ngOnDestroy(): void {
    if(this.placesSub)
    {
      this.placesSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.endDateSelected = false;
    this.startDateSelected = false;
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      price: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0)],
      }),
      startDate: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      endDate: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
    });

    this.startDate = new Date();
    this.endDate = new Date();
    this.endDate.setDate(this.endDate.getDate() + 1);

    this.formatedStartDate = this.startDate.toISOString().slice(0, 10);
    this.formatedEndDate = this.endDate.toISOString().slice(0, 10);
  }

  public openEndDate() {
    this.endDateSelected = !this.endDateSelected;
    this.startDateSelected = false;
    return this.endDateSelected;
  }

  public openStartDate() {
    this.startDateSelected = !this.startDateSelected;
    this.endDateSelected = false;
    return this.startDateSelected;
  }
  public createBooking() {
    if (!this.form.valid) {
      return;
    } else {
      this.place = new Place(
        Math.random().toString(),
        this.form.controls['title'].value,
        this.form.controls['description'].value,
        this.place.imageUrl,
        this.form.controls['price'].value,
        this.form.controls['startDate'].value,
        this.form.controls['endDate'].value,
        this.authService.getUserId
      );
    }
    this.isLoading = true;
    this.presentLoadingController();
 this.placesSub=   this.placeService.addPlace(this.place).subscribe((reseponse) => {
      setTimeout(() => {
        this.loadingCtrl.dismiss();
        this.form.reset();
        this.routerService.navigateByUrl("/places/offers");
      }, 500);
    });
  }

  public pickImages() {
    Camera.getPhoto({
      quality: 50,
      height: 200,
      // This is important for rendering images on the DOM.
      // It makes more sense to encode the image as a string and
      // store that on the DB rather than saving the actual file there.
      resultType: CameraResultType.Base64,
    }).then((image) => {
      this.place.imageUrl = image.base64String;
    });
  }

  async presentLoadingController() {
    const loading = await this.loadingCtrl.create({
      message: 'Adding your offer ....',
      duration: 5000,
      backdropDismiss: false,
    });
    await loading.present();
  }
  public endDateChanged(event) {
    this.endDate = event.detail.value;
    this.formatedEndDate = event.detail.value.slice(0, 10);
    this.endDateSelected = false;
  }

  public startDateChanged(event) {
    this.startDate = event.detail.value;
    this.formatedStartDate = event.detail.value.slice(0, 10);
    this.startDateSelected = false;
  }
}
