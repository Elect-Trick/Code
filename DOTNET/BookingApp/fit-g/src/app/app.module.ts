import { LandingPagePage } from './landing-page/landing-page.page';
import { LoginPagePage } from './login-modal/login-page.page';
import { FormInputComponent } from './custom-inputs/form-input/form-input/form-input.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TabsPage } from './tabs/tabs.page';
import { Tab3Page } from './tab3/tab3.page';
import { LoadingModalPageModule } from './modals/loading-modal/loading-modal/loading-modal.module';
@NgModule({
  declarations: [AppComponent, FormInputComponent, LoginPagePage,LandingPagePage,TabsPage,Tab3Page],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,LoadingModalPageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
