import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading =false;
  constructor(private authSer: AuthService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }
  async onSignIn()
  {

this.isLoading= true;
    this.authSer.signIn();
    setTimeout(()=>{
      this.isLoading = false;
      this.router.navigateByUrl('/places/discover');

    },1500);
    this.presentLoadingController();

  }


async  presentLoadingController()
  {
    const loading = await this.loadingCtrl.create({
      message: 'Signing you In....',
      duration:1500,
      backdropDismiss: false
    });
    await loading.present();

  }

  submitForm(f: NgForm)
  {
    if(!f.valid)
    {
      return;
    }
    else{
      this.onSignIn();
      f.reset();
      console.log(f.controls);

    }



  }

}
