import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacesPageRoutingModule } from './places-routing.module';
import { PipeTransform } from '@angular/core';
import { PlacesPage } from './places.page';
import { DiscoverPage } from './discover/discover.page';
import { TabsPage } from './tabs/tabs.page';
import { OffersPage } from './offers/offers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlacesPageRoutingModule,
  ],
  declarations: [PlacesPage,DiscoverPage,TabsPage,OffersPage]
})
export class PlacesPageModule {}
