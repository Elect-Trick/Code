import { ToastController, AlertController } from '@ionic/angular';
import { UsersService } from '../services/users.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  async presentAlert() {
    const toast = await this.alertCtrl.create({
      message: 'You need to be logged in to access this page... redirecting',
      buttons: [
        {
          text: 'Take me Home',
          role: 'confirm',
          handler: () => {
            this.router.navigateByUrl('');
          },
        },
      ],
    });
    toast.present();
  }
  canActivate(): Observable<boolean> {
    return this.userService.currentUser$.pipe(
      map((response) => {
        if (response) {
          return true;
        }
        this.presentAlert();
      })
    );
  }
}
