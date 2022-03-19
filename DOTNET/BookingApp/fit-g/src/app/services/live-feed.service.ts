import { Sport } from './../models/sport.model';
/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LiveFeedService {
  liveFeedUrl = environment.liveFeedUrl;
  constructor(private http: HttpClient) {}

  getBasketBallFixtures() {
    return this.http.get(
      this.liveFeedUrl +
        `basketball/?met=Fixtures&APIkey=${environment.liveFeedAPI_Key}!&from=2022-03-12&to=2022-03-28`
    );
  }

  getSupportedCountries(sport: string) {
    return this.http.get(
      this.liveFeedUrl +
        `${sport}/?met=Countries&APIkey=${environment.liveFeedAPI_Key}`
    );
  }
    // Retrieves fixtures based on the selected Sport and Country
  // Uses a week advance
  getFixtures(selection: Sport) {
    const from = new Date().toISOString().slice(0, 10);
    const toDate = new Date();
    const to = new Date(toDate.setDate(toDate.getDate() + 7)).toISOString().slice(0,10);
    return this.http.get(
      this.liveFeedUrl +
        `${selection.sportName.toLowerCase()}/?met=Fixtures&APIkey=${
          environment.liveFeedAPI_Key
        }&from=${from}&to=${to}}`
    );
  }
}
