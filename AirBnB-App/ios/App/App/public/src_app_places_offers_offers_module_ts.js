"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_places_offers_offers_module_ts"],{

/***/ 3826:
/*!********************************************************!*\
  !*** ./src/app/places/offers/offers-routing.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OffersPageRoutingModule": () => (/* binding */ OffersPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _offers_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./offers.page */ 9265);




const routes = [
    {
        path: 'offers',
        component: _offers_page__WEBPACK_IMPORTED_MODULE_0__.OffersPage,
        children: [
            {}
        ]
    },
    {
        path: 'new',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_places_offers_new-offer_new-offer_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./new-offer/new-offer.module */ 4697)).then(m => m.NewOfferPageModule)
    },
    {
        path: 'edit',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_places_offers_edit-offer_edit-offer_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./edit-offer/edit-offer.module */ 5460)).then(m => m.EditOfferPageModule)
    },
    {
        path: 'offer-bookings',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_places_offers_offer-bookings_offer-bookings_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./offer-bookings/offer-bookings.module */ 9372)).then(m => m.OfferBookingsPageModule)
    }
];
let OffersPageRoutingModule = class OffersPageRoutingModule {
};
OffersPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], OffersPageRoutingModule);



/***/ }),

/***/ 9438:
/*!************************************************!*\
  !*** ./src/app/places/offers/offers.module.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OffersPageModule": () => (/* binding */ OffersPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _offers_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./offers-routing.module */ 3826);






let OffersPageModule = class OffersPageModule {
};
OffersPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
            _offers_routing_module__WEBPACK_IMPORTED_MODULE_0__.OffersPageRoutingModule
        ],
        declarations: []
    })
], OffersPageModule);



/***/ })

}]);
//# sourceMappingURL=src_app_places_offers_offers_module_ts.js.map