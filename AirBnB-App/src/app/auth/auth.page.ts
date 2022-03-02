/* eslint-disable max-len */
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, Input, OnInit } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  passwordsMatch: boolean;
  isLoading = false;
  newUser = false;
  form = new FormGroup({
    email: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.required],
    }),
    password: new FormControl(null, {
      updateOn: 'change',
      validators: [Validators.required],
    }),
  });

  constructor(
    private authSer: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}
  async onSignIn() {}

  isNewUser() {
    this.newUser = true;
    this.presentAlertPrompt();
    this.form.reset();
  }

  register() {
    if (this.form.valid) {
      this.authSer
        .signUp(
          this.form.controls['email'].value,
          this.form.controls['password'].value
        )
        .subscribe(
          (_response) => {},
          (error) => {
            this.passwordErrorPrompt();
          }
        );
    }
  }
  async presentLoadingController(_message: string) {
    const loading = await this.loadingCtrl.create({
      message: _message,
      duration: 1500,
      backdropDismiss: false,
    });
    await loading.present();
  }

  submitForm() {
    this.isLoading = true;
    this.authSer
      .signIn(
        this.form.controls['email'].value,
        this.form.controls['password'].value
      )
      .subscribe(
        (response) => {
          this.presentLoadingController('Logging in');
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.failed('Sign in Failed, check credentials', 4000);
          this.form.reset();
        },
        () => {
          setTimeout(() => {
            this.success('Logged in Successfully');
            this.router.navigateByUrl('/places/discover');
            this.form.reset();
          }, 1500);
        }
      );
  }

  async passwordErrorPrompt() {
    const alert = await this.alertController.create({
      header: 'Please check Details, they are incorrect',
      buttons: [
        {
          text: 'Back to Registration',
          role: 'Ok',
          cssClass: 'secondary',
          handler: () => {
            this.presentAlertPrompt();
          },
        },
      ],
    });
    await alert.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Registration',
      inputs: [
        {
          label: 'E-mail',
          name: 'email',
          type: 'text',
          placeholder: 'E-mail',
        },
        {
          label: 'Password',
          name: 'password',
          type: 'text',
          placeholder: 'Password',
        },
        {
          label: 'Confirm Password',
          name: 'password2',
          type: 'text',
          placeholder: 'Password',
        },
      ],
      buttons: [
        {
          text: 'Register',
          role: 'Ok',
          handler: (response) => {
            if (
              response.password === '' ||
              response.password2 === '' ||
              response.email === '' ||
              response.password2 !== response.password
            ) {
              this.passwordErrorPrompt();
            } else {
              this.presentLoadingController(
                'Creating your account, hang tight'
              );
              setTimeout(() => {
                this.authSer
                  .signUp(response.email, response.password)
                  .subscribe(
                    (_response) => {},
                    (error) => {},
                    () => {
                      this.success('Successfully Registered');
                    }
                  );
              }, 100);
            }
          },
        },
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }

  async success(_message: string) {
    const toast = await this.toastController.create({
      message: _message,
      duration: 2000,
    });
    toast.present();
  }
  async failed(_message: string, _duration: number) {
    const toast = await this.toastController.create({
      message: _message,
      duration: _duration,
    });
    toast.present();
  }
}
interface LoginData {
  kind: string;
  localId: string;
  displayName: string;
  email: string;
  idToken: string;
  refreshToken: string;
  registered: boolean;
  expiresIn: number;
}
