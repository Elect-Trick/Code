/* eslint-disable @typescript-eslint/no-shadow */
import { ResetPassword } from './../models/reset-password.model';
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-underscore-dangle */
import { Registration } from './../models/registration.model';
import { UsersService } from './../services/users.service';
import { LoginPagePage } from './../login-modal/login-page.page';
import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { PasswordValidator } from '../landing-page/PasswordValidator';

import { LoginModel } from '../models/login.model';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
  @ViewChild('loginModal') loginModal;
  @ViewChild('registerModal') registerModal;
  @ViewChild('resetPasswordModal') resetPasswordModal;
  isLoading = false;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  resetToken: any;
  passwordResetModel: ResetPassword = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  user: LoginModel = {
    username: '',
    password: '',
  };
  userRegister: Registration = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  };
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

  constructor(
    public router: Router,
    public usersService: UsersService,
    private toast: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.initializeLoginForm();
    this.initializeRegisterForm();
    this.initializeResetForm();
    console.log(this.resetPasswordForm);
  }
  initializeLoginForm(): FormGroup {
    return (this.loginForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
      }
      // PasswordValidator.passwordMatchingValidatior
    ));
  }
  async presentLoadingController(_message: string) {
    const loader = await this.loadingCtrl.create({
      message: _message,
      duration: 3000,
    });
    loader.present();
  }
  async presentAlert(_message: string, _header: string) {
    const alert = await this.alertCtrl.create({
      message: _message,
      header: _header,
      buttons: ['Ok'],
    });
    alert.present();
  }

  async presentToast(_message: string) {
    const _toast = await this.toast.create({
      message: _message,
      cssClass: 'toaster',
    });
    _toast.present();
  }
  initializeResetForm() {
    return (this.resetPasswordForm = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ])
      },
      PasswordValidator.passwordMatchingValidatior
    ));
  }

  initializeRegisterForm(): FormGroup {
    return (this.registerForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
      },
      PasswordValidator.passwordMatchingValidatior
    ));
  }

  async login() {
    if (!this.loginForm.valid) {
      alert('Form is not complete');
    } else {
      this.user.username = this.loginForm.controls.username.value;
      this.user.password = this.loginForm.controls.password.value;
      await this.presentLoadingController('Logging you in, hang tight...');
      this.usersService.login(this.user).subscribe(
        (response) => {
          if (response) {
            this.loadingCtrl.dismiss();
            this.loginModal.dismiss();
            this.router.navigateByUrl('/tabs/tab1');
          }
        },
        (error: HttpErrorResponse) => {
          console.log('Error is', error);
          switch (error.status) {
            case 401:
              this.presentToast('Unauthorized, check login details');
              break;
            case 400:
              this.presentToast('User details not found');
              break;
            case 404:
              this.presentToast('This resource count not found');
              break;
            case 500:
              this.presentToast('Server Error, please contact support');
              break;
            default:
              this.presentToast('Server may be down, contact support');
              break;
          }
          this.loadingCtrl.dismiss();
        },
        () => {}
      );
    }
  }

  register() {
    this.userRegister.email = this.registerForm.controls.email.value;
    this.userRegister.username = this.registerForm.controls.username.value;
    this.userRegister.password = this.registerForm.controls.password.value;
    this.userRegister.confirmPassword =
      this.registerForm.controls.confirmPassword.value;
    this.presentLoadingController('Signing you up, hang tight...');

    if (this.registerForm.valid) {
      this.usersService.register(this.userRegister).subscribe(
        (response) => {
          this.presentAlert(
            'Success, please check your e-mails to activate the account before logging in', 'Success'
          );
          this.registerModal.dismiss();
          this.router.navigateByUrl('');
          this.loadingCtrl.dismiss();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.presentToast('The Form is invalid, please check the login details.');
    }
  }
  closeLoginModal() {
    this.loginModal.dismiss();
    this.loginForm.reset();
  }
  async closeRegisterModal() {
    this.registerModal.dismiss();
    this.registerForm.reset();
  }

  async resetPassword() {
    this.passwordResetModel.email = this.resetPasswordForm.controls.email.value;
    this.passwordResetModel.password =
      this.resetPasswordForm.controls.password.value;
    this.passwordResetModel.confirmPassword =
      this.resetPasswordForm.controls.confirmPassword.value;
    this.presentLoadingController('Preparing...');
    this.usersService.resetPassword(this.passwordResetModel).subscribe(
      (_response) => {
        this.presentAlert(
          'Your Password request has been submitted, check your e-mails to finalize.', 'Success'
        );

        // this.resetPasswordForm.reset();
        // this.closeResetModal();
      },
      (error) => {
        this.presentAlert('Could not process your request, please try again', 'Error');
      },
      () => {this.resetPasswordModal.dismiss();}
    );
  }

  presentResetModal() {
    this.resetPasswordModal.present();
  }
  closeResetModal() {
    this.resetPasswordModal.dismiss();
    this.resetPasswordForm.reset();
  }
}
