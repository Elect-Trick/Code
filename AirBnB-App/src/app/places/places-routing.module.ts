import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscoverPage } from './discover/discover.page';
import { EditOfferPageModule } from './offers/edit-offer/edit-offer.module';
import { EditOfferPage } from './offers/edit-offer/edit-offer.page';
import { OffersPage } from './offers/offers.page';

import { PlacesPage } from './places.page';

const routes: Routes = [
  {
    path: '',
    component: PlacesPage,
  },
  {
    path: 'discover',
    loadChildren: () =>
      import('./discover/discover.module').then((m) => m.DiscoverPageModule),
    children: [
      { path: 'discover', redirectTo: '/places/discover' },
      {
        path: '',
        component: DiscoverPage,
      },
      {
        path: 'offers',
        redirectTo: '/places/offers'
      },
      {
        path: ':placeId',
        loadChildren: () =>
          import('./discover/place-detail/place-detail.module').then(
            (m) => m.PlaceDetailPageModule
          ),
      },
    ],
  },
  {
    path: 'offers',
    loadChildren: () =>
      import('./offers/offers.module').then((m) => m.OffersPageModule),
    children: [
      {
        path: '',
        component: OffersPage,
      },
      {
        path: 'offers',
        redirectTo: '/places/offers'
      },
      {
        path: 'discover',
        redirectTo: '/places/discover'
      },
      {
        path: 'new',
        loadChildren: () =>
          import('./offers/new-offer/new-offer.module').then(
            (m) => m.NewOfferPageModule
          ),
      },
      {
        path: ':placeId',
        loadChildren: () =>
          import('./offers/offer-bookings/offer-bookings.module').then(
            (m) => m.OfferBookingsPageModule
          ),
      },
      {
        path: 'edit/:placeId',
        loadChildren: () =>
          import('./offers/edit-offer/edit-offer.module').then(
            (m) => m.EditOfferPageModule
          ),
      },
    ],
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesPageRoutingModule {}
