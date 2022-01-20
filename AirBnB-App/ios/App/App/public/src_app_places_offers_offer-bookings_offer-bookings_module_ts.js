"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_places_offers_offer-bookings_offer-bookings_module_ts"],{

/***/ 2256:
/*!*******************************************************************************!*\
  !*** ./src/app/places/offers/offer-bookings/offer-bookings-routing.module.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OfferBookingsPageRoutingModule": () => (/* binding */ OfferBookingsPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _offer_bookings_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./offer-bookings.page */ 6024);




const routes = [
    {
        path: '',
        component: _offer_bookings_page__WEBPACK_IMPORTED_MODULE_0__.OfferBookingsPage
    }
];
let OfferBookingsPageRoutingModule = class OfferBookingsPageRoutingModule {
};
OfferBookingsPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], OfferBookingsPageRoutingModule);



/***/ }),

/***/ 9372:
/*!***********************************************************************!*\
  !*** ./src/app/places/offers/offer-bookings/offer-bookings.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OfferBookingsPageModule": () => (/* binding */ OfferBookingsPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _offer_bookings_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./offer-bookings-routing.module */ 2256);
/* harmony import */ var _offer_bookings_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./offer-bookings.page */ 6024);







let OfferBookingsPageModule = class OfferBookingsPageModule {
};
OfferBookingsPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _offer_bookings_routing_module__WEBPACK_IMPORTED_MODULE_0__.OfferBookingsPageRoutingModule
        ],
        declarations: [_offer_bookings_page__WEBPACK_IMPORTED_MODULE_1__.OfferBookingsPage]
    })
], OfferBookingsPageModule);



/***/ }),

/***/ 6024:
/*!*********************************************************************!*\
  !*** ./src/app/places/offers/offer-bookings/offer-bookings.page.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OfferBookingsPage": () => (/* binding */ OfferBookingsPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_offer_bookings_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./offer-bookings.page.html */ 3295);
/* harmony import */ var _offer_bookings_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./offer-bookings.page.scss */ 4055);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _places_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../places.service */ 8897);







let OfferBookingsPage = class OfferBookingsPage {
    constructor(route, navCtrl, placesServ) {
        this.route = route;
        this.navCtrl = navCtrl;
        this.placesServ = placesServ;
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
    ngOnInit() {
        this.routeSub = this.route.paramMap.subscribe((respone) => {
            if (!respone.has('placeId')) {
                this.navCtrl.navigateBack('/places/offers');
                alert('in the sub');
                return;
            }
            // this.place = this.placesServ.places.find(
            //   (_place) => _place.id === respone.get('placeId')
            // );
            this.placeSub = this.placesServ
                .getPlace(respone.get('placeId'))
                .subscribe((response) => {
                this.place = response;
            });
            console.log('Place obtained', this.place);
        });
    }
    ngOnDestroy() {
        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
        if (this.placeSub) {
            this.placeSub.unsubscribe();
        }
    }
};
OfferBookingsPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.NavController },
    { type: _places_service__WEBPACK_IMPORTED_MODULE_2__.PlacesService }
];
OfferBookingsPage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-offer-bookings',
        template: _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_offer_bookings_page_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        styles: [_offer_bookings_page_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], OfferBookingsPage);



/***/ }),

/***/ 3295:
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/places/offers/offer-bookings/offer-bookings.page.html ***!
  \**************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button [defaultHref]=\"'/places/offers'\" ></ion-back-button>\n    </ion-buttons>\n    <ion-title>{{place.title}}</ion-title>\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n<ion-button color=\"primary\" [routerLink]=\"['/places/offers/edit',place.id]\">Edit</ion-button>\n</ion-content>\n");

/***/ }),

/***/ 4055:
/*!***********************************************************************!*\
  !*** ./src/app/places/offers/offer-bookings/offer-bookings.page.scss ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJvZmZlci1ib29raW5ncy5wYWdlLnNjc3MifQ== */";

/***/ })

}]);
//# sourceMappingURL=src_app_places_offers_offer-bookings_offer-bookings_module_ts.js.map