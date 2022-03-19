import { LoadingModalPageModule } from './../modals/loading-modal/loading-modal/loading-modal.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LoadingModalPage } from '../modals/loading-modal/loading-modal/loading-modal.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    Tab1PageRoutingModule,
    ScrollingModule,
  ],
  declarations: [Tab1Page, LoadingModalPage],
})
export class Tab1PageModule {}
