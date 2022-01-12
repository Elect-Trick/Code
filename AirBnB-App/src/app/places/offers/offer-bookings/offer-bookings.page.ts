import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Place } from '../../places.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  public place: Place={
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    price: 0,
    startDate: undefined,
    endDate: undefined,
    userID: ''
  };
  routeSub: Subscription;
  placeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesServ: PlacesService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe((respone) => {
      if (!respone.has('placeId')) {
        this.navCtrl.navigateBack('/places/offers');
        alert('in the sub');
        return;
      }
      // this.place = this.placesServ.places.find(
      //   (_place) => _place.id === respone.get('placeId')
      // );
      this.placeSub = this.placesServ
        .getPlace(respone.get('placeId'))
        .subscribe((response) => {
          this.place = response;
        });
      console.log('Place obtained', this.place);
    });
  }
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
