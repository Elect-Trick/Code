/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable arrow-body-style */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, zip } from 'rxjs';
import { take, map, tap, delay, find, switchMap } from 'rxjs/operators';
import { Place } from './places.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public generatedId: string;
  public places = new BehaviorSubject<Place[]>([
    // new Place(
    //   'p1',
    //   'Manhattan Mansion',
    //   'In the heart of New York City.',
    //   'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
    //   149.99,
    //   new Date(),
    //   new Date(),
    //   'abc'
    // ),
    // new Place(
    //   'p2',
    //   'L/Amour Toujours',
    //   'A romantic place in Paris!',
    //   'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
    //   189.99,
    //   new Date(),
    //   new Date(),
    //   'abc'
    // ),
    // new Place(
    //   'p3',
    //   'The Foggy Palace',
    //   'Not your average city trip!',
    //   'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
    //   99.99,
    //   new Date(),
    //   new Date(),
    //   'abc'
    // ),
  ]);
  constructor(private httpClient: HttpClient) {}
  public getPlaces() {
    return this.places.asObservable();
  }

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

    // return this.places.pipe(
    //   take(1),
    //   map((response) => {
    //     return { ...response.find((z) => z.id === placeId) };
    //   }));
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
        // console.log('http response is',response);
      );
    // return this.places.pipe(
    //   take(1),
    //   delay(1000),
    //   tap((places) => {
    //     this.places.next(places.concat(place));
    //   })
    // );
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

        return this.httpClient
          .put<PlaceData>(
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
