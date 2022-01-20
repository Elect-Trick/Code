"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_bookings_bookings_module_ts"],{

/***/ 2193:
/*!*****************************************************!*\
  !*** ./src/app/bookings/bookings-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BookingsPageRoutingModule": () => (/* binding */ BookingsPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _bookings_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bookings.page */ 324);




const routes = [
    {
        path: '',
        component: _bookings_page__WEBPACK_IMPORTED_MODULE_0__.BookingsPage
    },
    {
        path: 'map',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_bookings_map_map_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./map/map.module */ 5728)).then(m => m.MapPageModule)
    }
];
let BookingsPageRoutingModule = class BookingsPageRoutingModule {
};
BookingsPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule,],
    })
], BookingsPageRoutingModule);



/***/ }),

/***/ 1204:
/*!*********************************************!*\
  !*** ./src/app/bookings/bookings.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BookingsPageModule": () => (/* binding */ BookingsPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _bookings_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bookings-routing.module */ 2193);
/* harmony import */ var _bookings_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bookings.page */ 324);







let BookingsPageModule = class BookingsPageModule {
};
BookingsPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _bookings_routing_module__WEBPACK_IMPORTED_MODULE_0__.BookingsPageRoutingModule],
        declarations: [_bookings_page__WEBPACK_IMPORTED_MODULE_1__.BookingsPage],
        exports: [],
    })
], BookingsPageModule);



/***/ }),

/***/ 324:
/*!*******************************************!*\
  !*** ./src/app/bookings/bookings.page.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BookingsPage": () => (/* binding */ BookingsPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bookings_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./bookings.page.html */ 909);
/* harmony import */ var _bookings_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bookings.page.scss */ 4657);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth/auth.service */ 7079);
/* harmony import */ var _bookings_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bookings.service */ 7716);



/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-trailing-spaces */





let BookingsPage = class BookingsPage {
    constructor(bookingService, loadingCtrl, authServ, router) {
        this.bookingService = bookingService;
        this.loadingCtrl = loadingCtrl;
        this.authServ = authServ;
        this.router = router;
    }
    ngOnInit() { }
    ionViewWillEnter() {
        this.bookingSub = this.bookingService
            .fetchBookings()
            .subscribe((response) => {
            // We need to convert the object into an array for rendering in the front end.
            // Cannot iterate through obejcts
            const keys = Object.keys(response);
            this.deleteKey = keys;
            const values = Object.values(response);
            this.loadedBookings = values.filter(z => z.userId === this.authServ.getUserId);
            console.log(this.loadedBookings);
        });
    }
    ngOnDestroy() {
        if (this.bookingSub) {
            this.bookingSub.unsubscribe();
        }
    }
    presentLoadingController() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const loading = yield this.loadingCtrl.create({
                message: 'Deleting Your booking ....',
                duration: 1500,
                backdropDismiss: false,
            });
            yield loading.present();
        });
    }
    cancel(event) {
        console.log('Sliding event', event.detail);
    }
    cancelBooking(booking, slidingItem) {
        slidingItem.close();
        this.presentLoadingController();
        const found = this.loadedBookings.find((z) => z.id === booking.id);
        const index = this.loadedBookings.indexOf(found);
        setTimeout(() => {
            this.bookingService.cancelBooking(this.deleteKey[index]).subscribe(() => {
            });
        }, 1500);
    }
};
BookingsPage.ctorParameters = () => [
    { type: _bookings_service__WEBPACK_IMPORTED_MODULE_3__.BookingsService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.LoadingController },
    { type: _auth_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router }
];
BookingsPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-bookings',
        template: _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bookings_page_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        styles: [_bookings_page_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], BookingsPage);



/***/ }),

/***/ 909:
/*!************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/bookings/bookings.page.html ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n    <ion-title>Booked Places</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <!-- <ion-grid *ngIf=\"loadedBookings===null\">\n    <ion-row>\n      <ion-col size-md=\"6\" offset-md=\"3\">\n        <ion-label>\nThere are currently no bookings!\n        </ion-label>\n      </ion-col>\n    </ion-row>\n  </ion-grid> -->\n  <ion-grid>\n<ion-row>\n<ion-col size-md=\"6\" offset-md=\"3\" *ngIf=\"loadedBookings\">\n  <ion-label class=\"ion-text-center\" *ngIf=\"loadedBookings ===undefined\"> There are currently no bookings</ion-label>\n\n<ion-list >\n  <ion-item-sliding *ngFor=\"let booking of loadedBookings\" #slidingItem  >\n    <ion-item>\n      <ion-label>\n        <h5>{{booking.placeTitle}}</h5>\n        <P>Guests: {{booking.amountOfGuests}}</P>\n\n      </ion-label>\n      <!-- <ion-icon slot=\"end\" name=\"delete\"></ion-icon> -->\n\n    </ion-item>\n    <ion-item-options>\n      <ion-item-option color=\"danger\" (click)=\"cancelBooking(booking, slidingItem)\">\n        <ion-icon name=\"trash-outline\" slot=\"icon-only\"></ion-icon>\n      </ion-item-option>\n    </ion-item-options>\n  </ion-item-sliding>\n</ion-list>\n</ion-col>\n</ion-row>\n\n</ion-grid>\n</ion-content>\n");

/***/ }),

/***/ 4657:
/*!*********************************************!*\
  !*** ./src/app/bookings/bookings.page.scss ***!
  \*********************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJib29raW5ncy5wYWdlLnNjc3MifQ== */";

/***/ })

}]);
//# sourceMappingURL=src_app_bookings_bookings_module_ts.js.map