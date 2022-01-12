/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IonItemSliding,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../places.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  constructor(
    private offersService: PlacesService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {}
  isLoading: boolean;
  public offers: Place[] = [];
  private placesSub: Subscription;
  ngOnInit() {}
  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
  ionViewWillEnter() {
    this.isLoading = true;

    this.offersService.fetchPlaces().subscribe((response) => {
      this.presentLoadingController();

      setTimeout(() => {

        this.offers = response;

        this.isLoading = false;
      }, 1500);

    });

    // console.log(this.offers);
  }
  navigate() {}
  async presentLoadingController() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading Places ....',
      duration: 1750,
      backdropDismiss: false,
    });
    await loading.present();
  }

  onEdit(placeId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    // this.offersService.updateOffer(placeId).subscribe();
  }
}
