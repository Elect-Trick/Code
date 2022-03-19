import { Fixture } from './../models/fixture.model';
import { Sport } from './../models/sport.model';
import { LiveFeedService } from './../services/live-feed.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  sport: Sport = {
    id: 0,
    sportName: 'basketball',
    icon: '',
    country: 'argentina',
  };
  fixtures: Fixture[] = [];
  constructor(private liveFeed: LiveFeedService) {}
  ngOnInit(): void {
    this.liveFeed.getFixtures(this.sport).subscribe((response: Fixture) => {
      this.fixtures.push(response);
    });
  }
}
