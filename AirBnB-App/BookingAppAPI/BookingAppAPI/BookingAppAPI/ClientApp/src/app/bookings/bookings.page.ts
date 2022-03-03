/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-trailing-spaces */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { BookingCLass } from './bookings.model';
import { BookingsService } from './bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  public loadedBookings: BookingCLass[];
  public selectedBooking: BookingCLass;
  public deleteKey: string[];
  bookingSub: Subscription;
  constructor(
    private bookingService: BookingsService,
    private loadingCtrl: LoadingController,
    private authServ: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.bookingSub = this.bookingService
      .fetchBookings()
      .subscribe((response) => {
        // We need to convert the object into an array for rendering in the front end.
        // Cannot iterate through obejcts
        const keys = Object.keys(response);
        this.deleteKey = keys;
        const values = Object.values(response);
        this.loadedBookings = values.filter(
          z => z.userId === this.authServ.getUserId
        );
        console.log(this.loadedBookings);
      });
  }
  ngOnDestroy(): void {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
  async presentLoadingController() {
    const loading = await this.loadingCtrl.create({
      message: 'Deleting Your booking ....',
      duration: 1500,
      backdropDismiss: false,
    });
    await loading.present();
  }

  public cancel(event) {
    console.log('Sliding event', event.detail);
  }

  public cancelBooking(booking: BookingCLass, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.presentLoadingController();
    const found = this.loadedBookings.find((z) => z.id === booking.id);
    const index = this.loadedBookings.indexOf(found);
    setTimeout(() => {
      this.bookingService.cancelBooking(this.deleteKey[index]).subscribe(()=>{
      });
    }, 1500);
  }
}

interface BookingData {
  amountOfGuests: string;
  firstName: string;
  lastName: string;
  placeId: string;
  placeTitle: string;
  userId: string;
}
