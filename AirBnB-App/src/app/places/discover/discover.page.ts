/* eslint-disable @typescript-eslint/prefer-for-of */
import { DomSanitizer } from '@angular/platform-browser';
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  SegmentChangeEventDetail,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Place } from '../places.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  public loadedPlaces: Place[];
  private placesSub: Subscription;
  public bookablePlaces: Place[] = [];
  isLoading: boolean;
  constructor(
    private loadingCtrl: LoadingController,
    private placesService: PlacesService,
    private authServ: AuthService,
    private alertCtrl: AlertController,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.isLoading = true;
    this.presentLoadingController();
    this.placesSub = this.placesService.fetchPlaces().subscribe(
      (response) => {
        this.loadedPlaces = response;
        this.bookablePlaces = this.loadedPlaces;
        for (let index = 0; index < this.bookablePlaces.length; index++) {
          this.bookablePlaces[index].imageUrl =
            'data:image/jpg;base64,' +
            (
              this.sanitizer.bypassSecurityTrustResourceUrl(
                this.bookablePlaces[index].imageUrl
              ) as any
            ).changingThisBreaksApplicationSecurity;
          this.isLoading = false;
        }
        if (this.bookablePlaces) {
          this.loadingCtrl.dismiss();
        }
      },
      (error) => {
        this.presentAlertController();
      }
    );
  }

  public selectedSegment(event: CustomEvent) {
    if (event.detail.value === 'all') {
      this.bookablePlaces = this.loadedPlaces;
    } else {
      this.bookablePlaces = this.bookablePlaces.filter(
        (z) => z.id === this.authServ.getUserId
      );
    }
  }
  async presentLoadingController() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading Places',
      duration: 1500,
      backdropDismiss: false,
    });
    await loading.present();
  }

  async presentAlertController() {
    const loading = await this.alertCtrl.create({
      message: 'Resource not found, you will be redirected',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          handler: () => {
            this.router.navigate([`/places/discover/`]);
          },
        },
      ],
    });
    await loading.present();
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
