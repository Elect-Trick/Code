/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Place } from '../../places.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private placeServ: PlacesService,
    private actSheetCtrl: ActionSheetController,
    private authService: AuthService
  ) {}
  public isBookable: boolean;
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
private placeSub: Subscription;
ngOnDestroy(): void {
    if(this.placeSub)
    {
      this.placeSub.unsubscribe();
    }
}
  ngOnInit() {

    this.activeRoute.paramMap.subscribe(paraMap =>{
      if(!paraMap.has('placeId'))
      {
        this.navCtrl.navigateBack('/places/discover');
        return;
      }
      this.placeSub= this.placeServ.getPlace(paraMap.get('placeId')).subscribe(response =>{
         this.place = response;
         this.isBookable = this.place.userID !== this.authService.getUserId;
       });
    });

  }
  public bookPlace() {
  // this.navCtrl.navigateBack('/places/discover');
    // navCtrl is used to give proper navigation animation.
    this.presentModal();
    // this.launchActionSheet();

  }
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: { selectedPlace: this.place },
    });
     modal.present();
     console.log((await modal.onDidDismiss()));

  }


}
