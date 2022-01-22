/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  currVerifiedLoanOfficerPhoto: string;
  constructor(
    public offersService: PlacesService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private santizer: DomSanitizer
  ) {}
  testImage: string;
  isLoading: boolean;
  @Output() offers: Place[] = [];
  private placesSub: Subscription;


  ngOnInit() {

  }
  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
  ionViewWillEnter() {
    this.isLoading = true;
    this.presentLoadingController();
  this.placesSub =   this.offersService.fetchPlaces().subscribe((response) => {
      this.offers = response;
      for (let index = 0; index < this.offers.length; index++) {
        this.offers[index].imageUrl =
          'data:image/jpg;base64,' +
          (
            this.santizer.bypassSecurityTrustResourceUrl(
              this.offers[index].imageUrl
            ) as any
          ).changingThisBreaksApplicationSecurity;
      }
        this.isLoading = false;
        if(this.offers != null || this.offers !== undefined)
        {this.loadingCtrl.dismiss();}


    });
  }
  navigate() {}
  async presentLoadingController() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading Offers ....',
      duration: 5000,
      backdropDismiss: false,
    });
    await loading.present();
  }

  onEdit(placeId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    // this.offersService.updateOffer(placeId).subscribe();
  }
}
