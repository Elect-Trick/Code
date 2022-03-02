/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Place } from '../places.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(private discovered: PlacesService) {}
  public _Places: Place[] = [];
  private placesSub: Subscription;
  ngOnInit() {
    this.placesSub = this.discovered.places.subscribe(response =>{
      this._Places = response;
    });
  }
}
