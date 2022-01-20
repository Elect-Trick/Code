"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_places_offers_new-offer_new-offer_module_ts"],{

/***/ 114:
/*!*********************************************************************!*\
  !*** ./src/app/places/offers/new-offer/new-offer-routing.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewOfferPageRoutingModule": () => (/* binding */ NewOfferPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _new_offer_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./new-offer.page */ 8068);




const routes = [
    {
        path: '',
        component: _new_offer_page__WEBPACK_IMPORTED_MODULE_0__.NewOfferPage
    }
];
let NewOfferPageRoutingModule = class NewOfferPageRoutingModule {
};
NewOfferPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], NewOfferPageRoutingModule);



/***/ }),

/***/ 4697:
/*!*************************************************************!*\
  !*** ./src/app/places/offers/new-offer/new-offer.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewOfferPageModule": () => (/* binding */ NewOfferPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _new_offer_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./new-offer-routing.module */ 114);
/* harmony import */ var _new_offer_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./new-offer.page */ 8068);

// import { MapPage } from 'src/app/bookings/map/map.page';






let NewOfferPageModule = class NewOfferPageModule {
};
NewOfferPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _new_offer_routing_module__WEBPACK_IMPORTED_MODULE_0__.NewOfferPageRoutingModule
        ],
        declarations: [_new_offer_page__WEBPACK_IMPORTED_MODULE_1__.NewOfferPage]
    })
], NewOfferPageModule);



/***/ }),

/***/ 8068:
/*!***********************************************************!*\
  !*** ./src/app/places/offers/new-offer/new-offer.page.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewOfferPage": () => (/* binding */ NewOfferPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_new_offer_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./new-offer.page.html */ 3327);
/* harmony import */ var _new_offer_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./new-offer.page.scss */ 4789);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _places_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../places.model */ 225);
/* harmony import */ var _places_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../places.service */ 8897);
/* harmony import */ var src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/auth/auth.service */ 7079);




/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */







let NewOfferPage = class NewOfferPage {
    constructor(placeService, routerService, loadingCtrl, authService, modalController) {
        this.placeService = placeService;
        this.routerService = routerService;
        this.loadingCtrl = loadingCtrl;
        this.authService = authService;
        this.modalController = modalController;
        this._mapOpened = false;
    }
    ngOnInit() {
        // this.place = new Place();
        this.endDateSelected = false;
        this.startDateSelected = false;
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroup({
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl(null, {
                updateOn: 'change',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required],
            }),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl(null, {
                updateOn: 'change',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required],
            }),
            price: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl(null, {
                updateOn: 'change',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.min(0)],
            }),
            startDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl(null, {
                updateOn: 'change',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required],
            }),
            endDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl(null, {
                updateOn: 'change',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required],
            }),
        });
        this.startDate = new Date();
        this.endDate = new Date();
        this.endDate.setDate(this.endDate.getDate() + 1);
        this.formatedStartDate = this.startDate.toISOString().slice(0, 10);
        this.formatedEndDate = this.endDate.toISOString().slice(0, 10);
    }
    // public mapOpened()
    // {
    //     this._mapOpened = !this._mapOpened;
    // }
    // public openMap()
    // {
    //   this.presentModal();
    // }
    // async presentModal() {
    //   const modal = await this.modalController.create({
    //     component: MapPage,
    //     cssClass: 'my-custom-class',
    //     backdropDismiss: true,
    //   });
    //   return await modal.present();
    // }
    openEndDate() {
        this.endDateSelected = !this.endDateSelected;
        this.startDateSelected = false;
        return this.endDateSelected;
    }
    openStartDate() {
        this.startDateSelected = !this.startDateSelected;
        this.endDateSelected = false;
        return this.startDateSelected;
    }
    createBooking() {
        if (!this.form.valid) {
            return;
        }
        else {
            this.place = new _places_model__WEBPACK_IMPORTED_MODULE_2__.Place(Math.random().toString(), this.form.controls['title'].value, this.form.controls['description'].value, 'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg', this.form.controls['price'].value, this.form.controls['startDate'].value, this.form.controls['endDate'].value, this.authService.getUserId);
        }
        this.presentLoadingController();
        setTimeout(() => {
            this.isLoading = false;
        }, 1500);
        this.placeService.addPlace(this.place).subscribe(() => {
            this.form.reset();
            this.routerService.navigate(['/places/offers']);
        });
    }
    presentLoadingController() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const loading = yield this.loadingCtrl.create({
                message: 'Adding your offer ....',
                duration: 1500,
                backdropDismiss: false,
            });
            yield loading.present();
        });
    }
    endDateChanged(event) {
        this.endDate = event.detail.value;
        this.formatedEndDate = event.detail.value.slice(0, 10);
        this.endDateSelected = false;
    }
    startDateChanged(event) {
        this.startDate = event.detail.value;
        this.formatedStartDate = event.detail.value.slice(0, 10);
        this.startDateSelected = false;
    }
};
NewOfferPage.ctorParameters = () => [
    { type: _places_service__WEBPACK_IMPORTED_MODULE_3__.PlacesService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__.Router },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.LoadingController },
    { type: src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_4__.AuthService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController }
];
NewOfferPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-new-offer',
        template: _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_new_offer_page_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        styles: [_new_offer_page_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], NewOfferPage);



/***/ }),

/***/ 3327:
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/places/offers/new-offer/new-offer.page.html ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-back-button [defaultHref]=\"'/places/offers'\"></ion-back-button>\n    </ion-buttons>\n    <ion-title class=\"ion-text-center\">New Offer</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <form [formGroup]=\"form\">\n    <ion-grid>\n      <ion-row>\n        <ion-col size-sm=\"6\" offset-sm=\"3\">\n          <ion-item>\n            <ion-label position=\"floating\"> Title: </ion-label>\n            <ion-input\n              formControlName=\"title\"\n              type=\"text\"\n              autocomplete\n              autocorrect\n            ></ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col size-sm=\"6\" offset-sm=\"3\">\n          <ion-item>\n            <ion-label position=\"floating\"> Description: </ion-label>\n            <ion-textarea\n              type=\"text\"\n              rows=\"3\"\n              autocomplete\n              autocorrect\n              formControlName=\"description\"\n            ></ion-textarea>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col size-sm=\"6\" offset-sm=\"3\">\n          <ion-item>\n            <ion-label position=\"floating\"> Price: </ion-label>\n            <ion-input\n              min=\"0\"\n              type=\"number\"\n              rows=\"3\"\n              autocomplete\n              autocorrect\n              formControlName=\"price\"\n            ></ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col size-md=\"4\" offset-md=\"3\" offset-sm=\"3\">\n          <ion-item lines=\"inset\" (click)=\"openStartDate()\">\n            <ion-label>From:</ion-label>\n            <ion-text maxlength=\"180\" slot=\"end\"\n              >{{formatedStartDate}}</ion-text\n            >\n          </ion-item>\n          <ion-datetime\n            (ionChange)=\"startDateChanged($event)\"\n            [presentation]=\"date\"\n            *ngIf=\"startDateSelected\"\n            formControlName=\"startDate\"\n            [ngModel]=\"_start\"\n          >\n          </ion-datetime>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col size-md=\"4\" offset-md=\"3\" offset-sm=\"3\">\n          <ion-item lines=\"inset\" (click)=\"openEndDate()\">\n            <ion-label>To:</ion-label>\n            <ion-text slot=\"end\"> {{formatedEndDate}} </ion-text>\n          </ion-item>\n          <ion-datetime\n            (ionChange)=\"endDateChanged($event)\"\n            [presentation]=\"date\"\n            *ngIf=\"endDateSelected\"\n            formControlName=\"endDate\"\n            [(ngModel)]=\"selectedEndDate\"\n          >\n          </ion-datetime>\n        </ion-col>\n\n            </ion-row>\n\n            <!-- <ion-row *ngIf=\"_mapOpened===true\">\n              <ion-col>\n\n                <app-map></app-map>\n\n              </ion-col>\n            </ion-row> -->\n            <!-- <ion-button (click)=\"mapOpened()\">\n              <ion-icon name=\"location\" slot=\"icon-only\">\n\n              </ion-icon>\n              Add Location\n              </ion-button> -->\n      <!-- <ion-row>\n        <ion-col offset-md=\"5\" offset-sm=\"5\" offset=\"3.2\">\n          <ion-button\n            [disabled]=\"!form.valid\"\n            (click)=\"createBooking()\"\n            type=\"submit\"\n            color=\"primary\"\n            >Create Offer</ion-button\n          >\n        </ion-col>\n      </ion-row> -->\n    </ion-grid>\n  </form>\n</ion-content>\n");

/***/ }),

/***/ 4789:
/*!*************************************************************!*\
  !*** ./src/app/places/offers/new-offer/new-offer.page.scss ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuZXctb2ZmZXIucGFnZS5zY3NzIn0= */";

/***/ })

}]);
//# sourceMappingURL=src_app_places_offers_new-offer_new-offer_module_ts.js.map