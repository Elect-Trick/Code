/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-underscore-dangle */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ActionSheetController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { error } from 'protractor';
import { Subscription } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Place } from 'src/app/places/places.model';
import { BookingCLass } from '../bookings.model';
import { BookingsService } from '../bookings.service';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit, OnDestroy {
  @Input() selectedPlace: Place;
  _guestsClicked: boolean;
  form: FormGroup;
  _startDate: Date;
  _endDate: Date;
  bookings: BookingCLass[] = [];
  formatedStartDate: string;
  formatedEndDate: string;
  endDateSelected: boolean;
  startDateSelected: boolean;
  selectedEndDate: Date;
  booking: BookingCLass = {
    id: '',
    placeId: '',
    userId: '',
    placeTitle: '',
    amountOfGuests: 0,
    firstName: '',
    lastName: '',
    startDate: undefined,
    endDate: undefined,
  };
  bookingSub: Subscription;
  constructor(
    private modalCtrl: ModalController,
    private actSheetCtrl: ActionSheetController,
    private bookingService: BookingsService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this._guestsClicked = false;
    this._startDate = new Date();
    this._endDate = new Date();
    this._endDate.setDate(this._startDate.getDate() + 1);
    this.formatedStartDate = this._startDate.toISOString().slice(0, 10);
    this.formatedEndDate = this._endDate.toISOString().slice(0, 10);
    this.form = new FormGroup({
      firstName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      lastName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      guests: new FormControl(null, {
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
  }

  ngOnDestroy(): void {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
  guestsClicked() {
    this._guestsClicked = !this._guestsClicked;
    console.log(this._guestsClicked);
  }
  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
  onBookPlace() {
    this.launchActionSheet();
    // this.modalCtrl.({message: 'This is a test'}, 'confirmed');
  }
  async presentLoadingController() {
    const loading = await this.loadingCtrl.create({
      message: 'Adding your offer ....',
      duration: 1500,
      backdropDismiss: false,
    });
    await loading.present();
  }

  async launchActionSheet() {
    const actionSheet = await this.actSheetCtrl.create({
      header: 'Choose Date',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.handleBooking('select');
            this.modalCtrl.dismiss();
          },
        },
        {
          text: 'Random Date',
          handler: () => {
            this.handleBooking('random');
            this.modalCtrl.dismiss();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  handleBooking(mode: 'select' | 'random') {
    console.log(mode);
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
      this.presentLoadingController();
      this.finalizeForm();
      this.bookingService.addBooking(this.booking).subscribe(
        (response) => {
          this.router.navigate(['/bookings']);

          setTimeout(() => {

          }, 3000);
        },
        (error) => {},
        () => {
          this.form.reset();
        }
      );
    }
  }
  public finalizeForm() {
    this.booking.placeId = this.selectedPlace.id;
      this.booking.userId = this.authService.getUserId;
      this.booking.placeTitle = this.selectedPlace.title;
      this.booking.amountOfGuests = this.form.controls['guests'].value;
      this.booking.firstName = this.form.controls['firstName'].value;
      this.booking.lastName = this.form.controls['lastName'].value;
      this.booking.startDate = this.form.controls['startDate'].value;
      this.booking.endDate = this.form.controls['endDate'].value;
      this.booking.id = (Math.random() + 1).toString(36).substring(7);
  }

  public endDateChanged(event) {
    this.formatedEndDate = event.detail.value.slice(0, 10);
    this.endDateSelected = false;
  }

  public startDateChanged(event) {
    this.formatedStartDate = event.detail.value.slice(0, 10);
    this.startDateSelected = !this.startDateSelected;
  }
}
