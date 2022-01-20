"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_places_offers_edit-offer_edit-offer_module_ts"],{

/***/ 686:
/*!***********************************************************************!*\
  !*** ./src/app/places/offers/edit-offer/edit-offer-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditOfferPageRoutingModule": () => (/* binding */ EditOfferPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _edit_offer_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit-offer.page */ 3212);




const routes = [
    {
        path: '',
        component: _edit_offer_page__WEBPACK_IMPORTED_MODULE_0__.EditOfferPage
    }
];
let EditOfferPageRoutingModule = class EditOfferPageRoutingModule {
};
EditOfferPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], EditOfferPageRoutingModule);



/***/ }),

/***/ 5460:
/*!***************************************************************!*\
  !*** ./src/app/places/offers/edit-offer/edit-offer.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditOfferPageModule": () => (/* binding */ EditOfferPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _edit_offer_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit-offer-routing.module */ 686);
/* harmony import */ var _edit_offer_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit-offer.page */ 3212);







let EditOfferPageModule = class EditOfferPageModule {
};
EditOfferPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule,
            _edit_offer_routing_module__WEBPACK_IMPORTED_MODULE_0__.EditOfferPageRoutingModule
        ],
        declarations: [_edit_offer_page__WEBPACK_IMPORTED_MODULE_1__.EditOfferPage]
    })
], EditOfferPageModule);



/***/ }),

/***/ 3212:
/*!*************************************************************!*\
  !*** ./src/app/places/offers/edit-offer/edit-offer.page.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditOfferPage": () => (/* binding */ EditOfferPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_edit_offer_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./edit-offer.page.html */ 8179);
/* harmony import */ var _edit_offer_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit-offer.page.scss */ 1138);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _places_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../places.service */ 8897);








let EditOfferPage = class EditOfferPage {
    constructor(placeService, route, navCtrl, router, loadingCtrl, alertCtrl) {
        this.placeService = placeService;
        this.route = route;
        this.navCtrl = navCtrl;
        this.router = router;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.loadedPlaces = [];
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroup({
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(),
        });
        this.place = {
            id: '',
            title: '',
            description: '',
            imageUrl: '',
            price: 0,
            startDate: undefined,
            endDate: undefined,
            userID: '',
        };
    }
    ngOnDestroy() {
        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
        if (this.placesSub) {
            this.placesSub.unsubscribe();
        }
        if (this.placeSub) {
            this.placeSub.unsubscribe();
        }
    }
    ionViewWillEnter() {
        this.placeService.fetchPlaces().subscribe((response) => {
            this.loadedPlaces = response;
            this.place = this.loadedPlaces.find((z) => z.id === this.place.id);
        }, (error) => {
            this.presentAlertController();
        });
    }
    ngOnInit() {
        this.routeSub = this.route.paramMap.subscribe((paraMap) => {
            if (!paraMap.has('placeId')) {
                this.navCtrl.navigateBack('/place/offers');
            }
            this.placesSub = this.placeService
                .getPlace(paraMap.get('placeId'))
                .subscribe((response) => {
                this.place = response;
                console.log('PlaceId is', this.place.id);
                this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroup({
                    title: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(this.place.title, {
                        updateOn: 'change',
                        validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required],
                    }),
                    description: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl(this.place.description, {
                        updateOn: 'change',
                        validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required],
                    }),
                });
            }, (error) => { this.presentAlertController(); });
        });
    }
    updateOffer() {
        if (!this.form.valid) {
            return;
        }
        else {
            this.presentLoadingController();
            this.place.title = this.form.controls['title'].value;
            this.place.description = this.form.controls['description'].value;
            this.placeSub = this.placeService.updateOffer(this.place).subscribe((response) => { }, (error) => {
                this.presentAlertController();
            });
            setTimeout(() => {
                this.isLoading = false;
                this.router.navigate(['places/offers']);
            }, 1500);
        }
    }
    presentLoadingController() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const loading = yield this.loadingCtrl.create({
                message: 'Booking your spot....',
                duration: 1500,
                backdropDismiss: false,
            });
            yield loading.present();
        });
    }
    presentAlertController() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const loading = yield this.alertCtrl.create({
                message: 'Resource not found, you will be redirected',
                backdropDismiss: true,
                buttons: [
                    {
                        text: 'Okay',
                        role: 'cancel',
                        handler: () => {
                            this.router.navigate([`/places/offers/`]);
                        },
                    },
                ],
            });
            yield loading.present();
        });
    }
};
EditOfferPage.ctorParameters = () => [
    { type: _places_service__WEBPACK_IMPORTED_MODULE_2__.PlacesService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.NavController },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.Router },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.LoadingController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.AlertController }
];
EditOfferPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-edit-offer',
        template: _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_edit_offer_page_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        styles: [_edit_offer_page_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], EditOfferPage);



/***/ }),

/***/ 8179:
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/places/offers/edit-offer/edit-offer.page.html ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button  [defaultHref]=\"'/places/offers/'+place.id\"></ion-back-button>\n    </ion-buttons>\n    <ion-title>Edit Offer</ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button (click)=\"updateOffer()\" [disabled]=\"!form.valid\">\n<ion-icon name=\"checkmark\" slot=\"icon-only\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n  <form [formGroup]=\"form\">\n    <ion-grid>\n      <ion-row>\n        <ion-col size-sm=\"6\" offset-sm=\"3\">\n          <ion-item>\n            <ion-label position=\"floating\"> Title: </ion-label>\n            <ion-input\n              formControlName=\"title\"\n              type=\"text\"\n              autocomplete\n              autocorrect\n            ></ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col size-sm=\"6\" offset-sm=\"3\">\n          <ion-item>\n            <ion-label position=\"floating\"> Description: </ion-label>\n            <ion-textarea\n              type=\"text\"\n              rows=\"3\"\n              autocomplete\n              autocorrect\n              formControlName=\"description\"\n            ></ion-textarea>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </form>\n</ion-content>\n");

/***/ }),

/***/ 1138:
/*!***************************************************************!*\
  !*** ./src/app/places/offers/edit-offer/edit-offer.page.scss ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlZGl0LW9mZmVyLnBhZ2Uuc2NzcyJ9 */";

/***/ })

}]);
//# sourceMappingURL=src_app_places_offers_edit-offer_edit-offer_module_ts.js.map