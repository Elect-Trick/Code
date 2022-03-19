import { LoadingModalPage } from './../modals/loading-modal/loading-modal/loading-modal.page';
/* eslint-disable no-underscore-dangle */
import { Sport } from './../models/sport.model';
import { LiveFeedService } from './../services/live-feed.service';
import { UsersService } from './../services/users.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from '../models/country.model';
import { LoadingController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Fixture } from '../models/fixture.model';
import { IonInfiniteScroll } from '@ionic/angular';
import { ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    // autoplay: true,
  };
  loading = false;
  fixtures: Fixture[] = [];
  countries: Country[] = [];
  selectedSport: Sport = {
    id: 0,
    sportName: '',
    icon: '',
    country: '',
  };
  sports: Sport[] = [
    { id: 0, sportName: 'Basketball', icon: 'basketball-outline', country: '' },
    { id: 1, sportName: 'Football', icon: 'football-outline', country: '' },
    { id: 2, sportName: 'Cricket', icon: 'baseball-outline', country: '' },
  ];
  fixtureSub: Subscription;

  constructor(
    private router: Router,
    private userService: UsersService,
    private liveFeedService: LiveFeedService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}
  ngOnDestroy(): void {
    if (this.fixtureSub) {
      this.fixtureSub.unsubscribe();
    }
  }
  ngOnInit(): void {
    console.log(localStorage.getItem('user'));
  }

  compareWith(object1: Sport, object2: Sport) {
    return object1 && object2 ? object1.id === object2.id : object1 === object2;
  }

  logout() {
    this.userService.logout();
    console.log(localStorage.getItem('user'));
    this.router.navigateByUrl('');
  }

  print() {
    this.presentLoading();
    this.liveFeedService
      .getSupportedCountries(this.selectedSport.sportName.toLowerCase())
      .subscribe(
        (response: any) => {
          this.countries = response.result;
        },
        () => {}
      );
  }

  getFixtures() {
    this.presentLoading();
    this.fixtureSub = this.liveFeedService
      .getFixtures(this.selectedSport)
      .pipe(
        map((response: any) => {
          console.log('Fixtures', response);
          this.fixtures = response.result.filter(
            (z) => z.country_name === this.selectedSport.country
          );
        })
      )
      .subscribe();
  }
  async presentLoading() {
    const loader = await this.loadingCtrl.create({
      message: 'Fetching...',
    });
    return await loader.present().then(() => {
      if (this.fixtures) {
        loader.dismiss();
      }
    });
  }
}
