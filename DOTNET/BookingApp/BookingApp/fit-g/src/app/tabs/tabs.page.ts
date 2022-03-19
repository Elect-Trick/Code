/* eslint-disable no-underscore-dangle */
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import {take} from 'rxjs/operators';
import { OnDestroy } from '@angular/core';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
tabActive= false;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true
  };
  constructor(public router: Router, private activeRoute: ActivatedRoute ) {}

  ngOnInit(): void {

    // this.router.dispose();

}
}
