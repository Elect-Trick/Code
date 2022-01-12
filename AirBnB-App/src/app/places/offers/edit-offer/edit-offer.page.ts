import { OfferBookingsPage } from './../offer-bookings/offer-bookings.page';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../../places.model';
import { PlacesService } from '../../places.service';
import { error } from 'protractor';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  public loadedPlaces: Place[] = [];
  public form: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
  });
  public place: Place = {
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    price: 0,
    startDate: undefined,
    endDate: undefined,
    userID: '',
  };
  public routeSub: Subscription;
  public placesSub: Subscription;
  isLoading: boolean;
  placeSub: Subscription;
  constructor(
    private placeService: PlacesService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }

    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
  ionViewWillEnter() {
    this.placeService.fetchPlaces().subscribe(
      (response) => {
        this.loadedPlaces = response;
        this.place = this.loadedPlaces.find((z) => z.id === this.place.id);
      },
      (error) => {
this.presentAlertController();      }
    );
  }
  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe((paraMap) => {
      if (!paraMap.has('placeId')) {
        this.navCtrl.navigateBack('/place/offers');
      }

      this.placesSub = this.placeService
        .getPlace(paraMap.get('placeId'))
        .subscribe(
          (response) => {
            this.place = response;
            console.log('PlaceId is', this.place.id);
            this.form = new FormGroup({
              title: new FormControl(this.place.title, {
                updateOn: 'change',
                validators: [Validators.required],
              }),
              description: new FormControl(this.place.description, {
                updateOn: 'change',
                validators: [Validators.required],
              }),
            });
          },
          (error) => {this.presentAlertController();}
        );
    });
  }

  public updateOffer() {
    if (!this.form.valid) {
      return;
    } else {
      this.presentLoadingController();
      this.place.title = this.form.controls['title'].value;
      this.place.description = this.form.controls['description'].value;
      this.placeSub = this.placeService.updateOffer(this.place).subscribe(
        (response) => {},
        (error) => {
          this.presentAlertController();
        }
      );

      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['places/offers']);
      }, 1500);
    }
  }
  async presentLoadingController() {
    const loading = await this.loadingCtrl.create({
      message: 'Booking your spot....',
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
            this.router.navigate([`/places/offers/`]);
          },
        },
      ],
    });
    await loading.present();
  }
}
