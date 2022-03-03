/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/semi */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  delay,
  map,
  single,
  switchMap,
  take,
  takeLast,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Place } from '../places/places.model';
import { BookingCLass } from './bookings.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  public bookings = new BehaviorSubject<BookingCLass[]>([]);
  generatedId: string;
  constructor(private httpCtrl: HttpClient, private authServ: AuthService) {}

  get getBookings() {
    return this.bookings.asObservable();
  }

  public fetchBookings() {
    return this.httpCtrl
      .get<BookingCLass[]>(
        `https://udemyairbnb-default-rtdb.firebaseio.com/bookings/id.json`
      )
      .pipe(
        tap((res) => {
          const response = res;
          return this.bookings.next(res);
        })
      );
  }
  public addBooking(bookingDetails: BookingCLass) {
    return this.httpCtrl
      .post<{ name: string }>(
        'https://udemyairbnb-default-rtdb.firebaseio.com/bookings/id/.json',
        {
          ...bookingDetails,
          id: null,
        }
      )
      .pipe(
        switchMap((response) => {
          this.generatedId = response.name;
          return this.bookings;
        }),
        take(1),
        tap((_bookings) => {
          bookingDetails.id = this.generatedId;
          this.bookings.next(_bookings.concat(bookingDetails));
        })
        // console.log('http response is',response);
      );
  }
  public deleteBooking(booking: BookingCLass) {}

  public cancelBooking(booking: string) {
    //   return this.getBookings.pipe(
    //     take(1),
    //     delay(100),
    //     tap((response) => {
    //       this.bookings.next(response.filter((b) => b.placeId !== bookingId));
    //       console.log(response);
    //     })
    //   );
    // }

    //  return this.bookings.pipe(tap(response=>{
    //   console.log('Bookings are',this.bookings.value);
    //   return response;
    // }));
    // return this.bookings.pipe(map(z=>{
    //   console.log(Object.keys(z));
    // }));
    return this.httpCtrl
      .delete(
        `https://udemyairbnb-default-rtdb.firebaseio.com/bookings/id/${booking}.json`
      )
      .pipe(
        switchMap(() => {
          return this.bookings;
        }),
        take(1),
        tap((_bookings) => {
          this.bookings.next(_bookings.filter((z) => z.id !== null));
        })
      );
  }
}
interface BookingData {
  bookingId: string;
  amountOfGuests: number;
  firstName: string;
  lastName: string;
  placeId: string;
  placeTitle: string;
  userId: string;
}
