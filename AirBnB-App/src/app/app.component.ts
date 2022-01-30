/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  async ngOnInit(): Promise<void> {
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true
    });

  }

  constructor(private authServ: AuthService, private router: Router) {}

  onSignOut() {
    this.authServ.signOut();
    this.router.navigateByUrl('/auth');
  }
}
