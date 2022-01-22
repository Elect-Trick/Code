/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable arrow-body-style */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, find, switchMap } from 'rxjs/operators';
import { Place } from './places.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public firebaseApp: any;
  public generatedId: string;
  places = new BehaviorSubject<Place[]>([]);
  constructor(private httpClient: HttpClient) {}
  public getPlaces() {
    return this.places.asObservable();
  }

  // postImages(images: any){

  //   // const file = new File(images, );
  //   const storageRef = firebase.storage().ref().child(`images/${images}.jpg`);
  // //  const catRef = storageRef.child(`C:/Users/Njabulo Majenje/Pictures/Giphs/${images}`);
  // storageRef.put(images).then(snapshot=>{
  //   console.log('File Uploaded', snapshot);
  // });
  // const url = storageRef.getDownloadURL();
  // console.log('URL',url);

  //   // return this.httpClient.post('http://royalteas.co.za/royalkgg_App',images);
  // }

  public testFire() {}

  public getPlace(placeId: string) {
    // This returns a copy of the place so we don't alter the original one.
    return this.httpClient
      .get<PlaceData>(
        `https://udemyairbnb-default-rtdb.firebaseio.com/offered-places/${placeId}.json`
      )
      .pipe(
        map((response) => {
          return new Place(
            placeId,
            response.title,
            response.description,
            response.imageUrl,
            response.price,
            new Date(response.startDate),
            new Date(response.endDate),
            response.userID
          );
        })
      );
  }
  fetchPlaces() {
    return this.httpClient
      .get<{ [key: string]: PlaceData }>(
        'https://udemyairbnb-default-rtdb.firebaseio.com/offered-places.json'
      )
      .pipe(
        map((response) => {
          const places = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  response[key].title,
                  response[key].description,
                  response[key].imageUrl,
                  response[key].price,
                  response[key].startDate,
                  response[key].endDate,
                  response[key].userID
                )
              );
            }
          }
          return places;
        }),
        take(1),
        tap((response) => {
          this.places.next(response);
        })
      );
  }

  public addPlace(place: Place) {
    if (place == null) {
      return;
    }

    return this.httpClient
      .post<{ name: string }>(
        'https://udemyairbnb-default-rtdb.firebaseio.com/offered-places.json',
        { ...place, id: null }
      )
      .pipe(
        switchMap((response) => {
          this.generatedId = response.name;
          return this.places;
        }),
        take(1),
        tap((places) => {
          place.id = this.generatedId;
          this.places.next(places.concat(place));
        })
      );
  }

  public updateOffer(place: Place) {
    let updatedPlace: Place[];

    return this.places.pipe(
      take(1),
      switchMap((response) => {
        const placeIndex = response.findIndex((z) => z.id === place.id);
        updatedPlace = [...response];
        updatedPlace[placeIndex].description = place.description;
        response[placeIndex].title = place.title;
        updatedPlace[placeIndex] = new Place(
          place.id,
          response[placeIndex].title,
          response[placeIndex].description,
          place.imageUrl,
          place.price,
          place.startDate,
          place.endDate,
          place.userID
        );

        return this.httpClient.put<PlaceData>(
          `https://udemyairbnb-default-rtdb.firebaseio.com/offered-places/${place.id}.json`,
          { ...updatedPlace[placeIndex], id: null }
        );
      })
    );
  }
}
interface PlaceData {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  startDate: Date;
  endDate: Date;
  userID: string;
}
