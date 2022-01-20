"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_places_discover_place-detail_place-detail_module_ts"],{

/***/ 3363:
/*!*********************************************************************!*\
  !*** ./src/app/bookings/create-booking/create-booking.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateBookingComponent": () => (/* binding */ CreateBookingComponent),
/* harmony export */   "GeoJson": () => (/* binding */ GeoJson),
/* harmony export */   "FeatureCollection": () => (/* binding */ FeatureCollection)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_create_booking_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./create-booking.component.html */ 35);
/* harmony import */ var _create_booking_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-booking.component.scss */ 8295);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/auth/auth.service */ 7079);
/* harmony import */ var _bookings_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../bookings.service */ 7716);



/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-underscore-dangle */






let CreateBookingComponent = class CreateBookingComponent {
    constructor(modalCtrl, actSheetCtrl, bookingService, authService, loadingCtrl, router) {
        this.modalCtrl = modalCtrl;
        this.actSheetCtrl = actSheetCtrl;
        this.bookingService = bookingService;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.router = router;
        this.bookings = [];
        this.booking = {
            id: '',
            placeId: '',
            userId: '',
            placeTitle: '',
            amountOfGuests: 0,
            firstName: '',
            lastName: '',
            startDate: undefined,
            endDate: undefined,
        };
    }
    ngOnInit() {
        this._guestsClicked = false;
        this._startDate = new Date();
        this._endDate = new Date();
        this._endDate.setDate(this._startDate.getDate() + 1);
        this.formatedStartDate = this._startDate.toISOString().slice(0, 10);
        this.formatedEndDate = this._endDate.toISOString().slice(0, 10);
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroup({
            firstName: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl(null, {
                updateOn: 'change',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
            }),
            lastName: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl(null, {
                updateOn: 'change',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
            }),
            guests: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl(null, {
                updateOn: 'change',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.min(0)],
            }),
            startDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl(null, {
                updateOn: 'change',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
            }),
            endDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl(null, {
                updateOn: 'change',
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required],
            }),
        });
    }
    ngOnDestroy() {
        if (this.bookingSub) {
            this.bookingSub.unsubscribe();
        }
    }
    guestsClicked() {
        this._guestsClicked = !this._guestsClicked;
        console.log(this._guestsClicked);
    }
    onCancel() {
        this.modalCtrl.dismiss(null, 'cancel');
    }
    onBookPlace() {
        this.launchActionSheet();
        // this.modalCtrl.({message: 'This is a test'}, 'confirmed');
    }
    presentLoadingController() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            const loading = yield this.loadingCtrl.create({
                message: 'Adding your offer ....',
                duration: 1500,
                backdropDismiss: false,
            });
            yield loading.present();
        });
    }
    launchActionSheet() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            const actionSheet = yield this.actSheetCtrl.create({
                header: 'Choose Date',
                buttons: [
                    {
                        text: 'Select Date',
                        handler: () => {
                            this.handleBooking('select');
                            this.modalCtrl.dismiss();
                        },
                    },
                    {
                        text: 'Random Date',
                        handler: () => {
                            this.handleBooking('random');
                            this.modalCtrl.dismiss();
                        },
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                    },
                ],
            });
            yield actionSheet.present();
        });
    }
    handleBooking(mode) {
        console.log(mode);
    }
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
            this.presentLoadingController();
            this.finalizeForm();
            this.bookingService.addBooking(this.booking).subscribe((response) => {
                this.router.navigate(['/bookings']);
                setTimeout(() => { }, 3000);
            }, (error) => { }, () => {
                this.form.reset();
            });
        }
    }
    //   public generateMap(){
    //     mapboxgl.accessToken = '<your access token here>';
    // const map = new mapboxgl.Map({
    //     container: 'map', // container ID
    //     style: 'mapbox://styles/mapbox/streets-v11', // style URL
    //     center: [-74.5, 40], // starting position [lng, lat]
    //     zoom: 9 // starting zoom
    // });
    //   }
    finalizeForm() {
        this.booking.placeId = this.selectedPlace.id;
        this.booking.userId = this.authService.getUserId;
        this.booking.placeTitle = this.selectedPlace.title;
        this.booking.amountOfGuests = this.form.controls['guests'].value;
        this.booking.firstName = this.form.controls['firstName'].value;
        this.booking.lastName = this.form.controls['lastName'].value;
        this.booking.startDate = this.form.controls['startDate'].value;
        this.booking.endDate = this.form.controls['endDate'].value;
        this.booking.id = (Math.random() + 1).toString(36).substring(7);
    }
    endDateChanged(event) {
        this.formatedEndDate = event.detail.value.slice(0, 10);
        this.endDateSelected = false;
    }
    startDateChanged(event) {
        this.formatedStartDate = event.detail.value.slice(0, 10);
        this.startDateSelected = !this.startDateSelected;
    }
};
CreateBookingComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ModalController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.ActionSheetController },
    { type: _bookings_service__WEBPACK_IMPORTED_MODULE_3__.BookingsService },
    { type: src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.LoadingController },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_7__.Router }
];
CreateBookingComponent.propDecorators = {
    selectedPlace: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Input }]
};
CreateBookingComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-create-booking',
        template: _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_create_booking_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        styles: [_create_booking_component_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], CreateBookingComponent);

class GeoJson {
    constructor(coordinates, properties) {
        this.properties = properties;
        this.geometry = {
            type: 'Point',
            coordinates: coordinates,
        };
    }
}
class FeatureCollection {
    constructor(feature) {
        this.feature = feature;
        this.type = 'FeatureCollection';
    }
}


/***/ }),

/***/ 3423:
/*!*****************************************************************************!*\
  !*** ./src/app/places/discover/place-detail/place-detail-routing.module.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaceDetailPageRoutingModule": () => (/* binding */ PlaceDetailPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _place_detail_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./place-detail.page */ 8588);




const routes = [
    {
        path: '',
        component: _place_detail_page__WEBPACK_IMPORTED_MODULE_0__.PlaceDetailPage
    }
];
let PlaceDetailPageRoutingModule = class PlaceDetailPageRoutingModule {
};
PlaceDetailPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], PlaceDetailPageRoutingModule);



/***/ }),

/***/ 4013:
/*!*********************************************************************!*\
  !*** ./src/app/places/discover/place-detail/place-detail.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaceDetailPageModule": () => (/* binding */ PlaceDetailPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _place_detail_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./place-detail-routing.module */ 3423);
/* harmony import */ var _place_detail_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./place-detail.page */ 8588);
/* harmony import */ var src_app_bookings_create_booking_create_booking_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/bookings/create-booking/create-booking.component */ 3363);








let PlaceDetailPageModule = class PlaceDetailPageModule {
};
PlaceDetailPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule,
            _place_detail_routing_module__WEBPACK_IMPORTED_MODULE_0__.PlaceDetailPageRoutingModule
        ],
        declarations: [_place_detail_page__WEBPACK_IMPORTED_MODULE_1__.PlaceDetailPage, src_app_bookings_create_booking_create_booking_component__WEBPACK_IMPORTED_MODULE_2__.CreateBookingComponent]
    })
], PlaceDetailPageModule);



/***/ }),

/***/ 8588:
/*!*******************************************************************!*\
  !*** ./src/app/places/discover/place-detail/place-detail.page.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlaceDetailPage": () => (/* binding */ PlaceDetailPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_place_detail_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./place-detail.page.html */ 1648);
/* harmony import */ var _place_detail_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./place-detail.page.scss */ 6165);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/auth/auth.service */ 7079);
/* harmony import */ var src_app_bookings_create_booking_create_booking_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/bookings/create-booking/create-booking.component */ 3363);
/* harmony import */ var _places_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../places.service */ 8897);



/* eslint-disable @typescript-eslint/member-ordering */






let PlaceDetailPage = class PlaceDetailPage {
    constructor(activeRoute, router, navCtrl, modalCtrl, placeServ, actSheetCtrl, authService) {
        this.activeRoute = activeRoute;
        this.router = router;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.placeServ = placeServ;
        this.actSheetCtrl = actSheetCtrl;
        this.authService = authService;
        this.place = {
            id: '',
            title: '',
            description: '',
            imageUrl: '',
            price: 0,
            startDate: undefined,
            endDate: undefined,
            userID: ''
        };
    }
    ngOnDestroy() {
        if (this.placeSub) {
            this.placeSub.unsubscribe();
        }
    }
    ngOnInit() {
        this.activeRoute.paramMap.subscribe(paraMap => {
            if (!paraMap.has('placeId')) {
                this.navCtrl.navigateBack('/places/discover');
                return;
            }
            this.placeSub = this.placeServ.getPlace(paraMap.get('placeId')).subscribe(response => {
                this.place = response;
                this.isBookable = this.place.userID !== this.authService.getUserId;
            });
        });
    }
    bookPlace() {
        // this.navCtrl.navigateBack('/places/discover');
        // navCtrl is used to give proper navigation animation.
        this.presentModal();
        // this.launchActionSheet();
    }
    presentModal() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalCtrl.create({
                component: src_app_bookings_create_booking_create_booking_component__WEBPACK_IMPORTED_MODULE_3__.CreateBookingComponent,
                componentProps: { selectedPlace: this.place },
            });
            modal.present();
            console.log((yield modal.onDidDismiss()));
        });
    }
};
PlaceDetailPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.NavController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController },
    { type: _places_service__WEBPACK_IMPORTED_MODULE_4__.PlacesService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ActionSheetController },
    { type: src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService }
];
PlaceDetailPage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-place-detail',
        template: _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_place_detail_page_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        styles: [_place_detail_page_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], PlaceDetailPage);



/***/ }),

/***/ 35:
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/bookings/create-booking/create-booking.component.html ***!
  \**************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"primary\">\n      <ion-button slot=\"primary\" (click)=\"onCancel()\">\n        <ion-icon name=\"close\" slot=\"icon-only\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n    <ion-title class=\"ion-text-center\">{{ selectedPlace.title }}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <form [formGroup]=\"form\" (ngSubmit)=\"createBooking()\">\n    <ion-grid>\n      <ion-row>\n        <ion-col size-sm=\"6\" offset-sm=\"3\">\n          <ion-item>\n            <ion-label position=\"floating\">First Name</ion-label>\n            <ion-input\n              type=\"text\"\n              formControlName=\"firstName\"\n              required\n            ></ion-input>\n          </ion-item>\n        </ion-col> </ion-row\n      ><ion-row>\n        <ion-col size-sm=\"6\" offset-sm=\"3\">\n          <ion-item>\n            <ion-label position=\"floating\">Last Name</ion-label>\n            <ion-input\n              type=\"text\"\n              formControlName=\"lastName\"\n              required\n            ></ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row >\n      <ion-row (click)=\"guestsClicked()\">\n        <ion-col size-sm=\"6\" offset-sm=\"3\">\n          <ion-item>\n            <ion-label position=\"floating\">Guests</ion-label>\n            <ion-select\n              [ngModel]=\"'2'\"\n              class=\"ion-text-end\"\n              formControlName=\"guests\"\n\n            >\n              <ion-select-option value=\"1\">1</ion-select-option>\n              <ion-select-option value=\"2\">2</ion-select-option>\n              <ion-select-option value=\"3\">3</ion-select-option>\n            </ion-select>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n\n\n        <ion-row *ngIf=\"_guestsClicked\">\n          <ion-col size-md=\"4\" offset-md=\"3\" offset-sm=\"3\">\n            <ion-item lines=\"inset\" (click)=\"openStartDate()\">\n              <ion-label>From:</ion-label>\n              <ion-text slot=\"end\">{{ formatedStartDate }}</ion-text>\n            </ion-item>\n            <ion-datetime\n              (ionChange)=\"startDateChanged($event)\"\n              [presentation]=\"date\"\n              *ngIf=\"startDateSelected\"\n              formControlName=\"startDate\"\n              [(ngModel)]=\"formatedStartDate\"\n            >\n            </ion-datetime>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col size-md=\"4\" offset-md=\"3\" offset-sm=\"3\">\n            <ion-item lines=\"inset\" (click)=\"openEndDate()\">\n              <ion-label>To:</ion-label>\n              <ion-text slot=\"end\"> {{ formatedEndDate }} </ion-text>\n            </ion-item>\n            <ion-datetime\n              (ionChange)=\"endDateChanged($event)\"\n              [presentation]=\"date\"\n              *ngIf=\"endDateSelected\"\n              formControlName=\"endDate\"\n              [min]=\"formatedStartDate\"\n            >\n\n            </ion-datetime>\n          </ion-col>\n        </ion-row>\n      <ion-row>\n        <ion-col class=\"ion-text-center\">\n          <!-- <p class=\"ion-text-center\">{{ selectedPlace.description }}</p> -->\n          <ion-button type=\"submit\"  color=\"primary\"\n            >Book</ion-button\n          >\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </form>\n</ion-content>\n");

/***/ }),

/***/ 1648:
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/places/discover/place-detail/place-detail.page.html ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-back-button [defaultHref]=\"'/places/discover'\"></ion-back-button>\n    </ion-buttons>\n    <ion-title class=\"ion-text-center\">Details</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n    <ion-row fixed>\n      <ion-col size-lg=\"8\" offset-lg=\"2\" class=\"ion-text-center\">\n        <ion-card>\n          <ion-card-header>\n            <ion-card-title>{{place.title}}</ion-card-title>\n            <ion-card-subtitle\n              >{{place.price | currency}}/Night</ion-card-subtitle\n            >\n          </ion-card-header>\n\n          <ion-img [src]=\"place.imageUrl\"></ion-img>\n          <ion-card-content>\n            <p>{{place.description}}</p>\n          </ion-card-content>\n                </ion-card>\n      </ion-col>\n    </ion-row>\n    <ion-button *ngIf=\"isBookable===true\" expand=\"full\" (click)=\"bookPlace()\" color=\"primary\">Book</ion-button>\n\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ 8295:
/*!***********************************************************************!*\
  !*** ./src/app/bookings/create-booking/create-booking.component.scss ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = ".dateSelectedClass {\n  border: 2px solid red;\n}\n\n.dateNotSelectedClass {\n  border: 2px solid blue;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyZWF0ZS1ib29raW5nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRUEscUJBQUE7QUFBQTs7QUFFQTtFQUVFLHNCQUFBO0FBQUYiLCJmaWxlIjoiY3JlYXRlLWJvb2tpbmcuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGF0ZVNlbGVjdGVkQ2xhc3Ncclxue1xyXG5ib3JkZXI6IDJweCBzb2xpZCByZWQ7fVxyXG5cclxuLmRhdGVOb3RTZWxlY3RlZENsYXNzXHJcbntcclxuICBib3JkZXI6IDJweCBzb2xpZCBibHVlO1xyXG59XHJcbiJdfQ== */";

/***/ }),

/***/ 6165:
/*!*********************************************************************!*\
  !*** ./src/app/places/discover/place-detail/place-detail.page.scss ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFjZS1kZXRhaWwucGFnZS5zY3NzIn0= */";

/***/ })

}]);
//# sourceMappingURL=src_app_places_discover_place-detail_place-detail_module_ts.js.map