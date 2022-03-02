import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PersonsComponent } from './persons/persons.component';
import { FormsModule } from '@angular/forms';
import { PersonInputComponent } from './persons/person-input.component';
import { AppComponent } from './app.component';
import { PersonsService } from './persons/persons.service';
import  { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ServiceNameService {
  constructor() { }

}
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    PersonInputComponent,

  ],
  imports: [
    BrowserModule,FormsModule, AppRoutingModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
