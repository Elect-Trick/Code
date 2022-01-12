/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, SegmentChangeEventDetail } from '@ionic/angular';
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
  constructor(
    private loadingCtrl: LoadingController,
    private placesService: PlacesService,
    private authServ: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    //  this.placesService.fetchPlaces().subscribe(response =>{
    //   this.presentLoadingController();
    //   this.loadedPlaces = response;
    //   setTimeout(()=>{
    //     this.bookablePlaces = this.loadedPlaces;
    //     if(this.loadedPlaces)
    //   {
    //     this.loadingCtrl.dismiss();
    //   }
    //   },1500);
    //    });
  }

  ionViewWillEnter() {
    this.placesSub = this.placesService.fetchPlaces().subscribe((response) => {
      this.presentLoadingController();
      setTimeout(()=>{
        this.loadedPlaces = response;
        this.bookablePlaces = this.loadedPlaces;
        if(this.loadedPlaces)
        {
          this.loadingCtrl.dismiss();
        }

      },1000);
    },error =>{
      this.presentAlertController();

    });
  }
  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
  public selectedSegment(event: CustomEvent) {
    if (event.detail.value === 'all') {
      this.bookablePlaces = this.loadedPlaces;
    } else {
      this.bookablePlaces = this.bookablePlaces.filter(
        (z) => z.id === this.authServ.getUserId
      );
      console.log(this.bookablePlaces.length);
    }
    console.log(event.detail);
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
}
