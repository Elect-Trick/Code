"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_auth_auth_module_ts"],{

/***/ 7924:
/*!*********************************************!*\
  !*** ./src/app/auth/auth-routing.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthPageRoutingModule": () => (/* binding */ AuthPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _auth_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.page */ 2452);




const routes = [
    {
        path: '',
        component: _auth_page__WEBPACK_IMPORTED_MODULE_0__.AuthPage
    }
];
let AuthPageRoutingModule = class AuthPageRoutingModule {
};
AuthPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], AuthPageRoutingModule);



/***/ }),

/***/ 5036:
/*!*************************************!*\
  !*** ./src/app/auth/auth.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthPageModule": () => (/* binding */ AuthPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _auth_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth-routing.module */ 7924);
/* harmony import */ var _auth_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.page */ 2452);







let AuthPageModule = class AuthPageModule {
};
AuthPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _auth_routing_module__WEBPACK_IMPORTED_MODULE_0__.AuthPageRoutingModule
        ],
        declarations: [_auth_page__WEBPACK_IMPORTED_MODULE_1__.AuthPage]
    })
], AuthPageModule);



/***/ }),

/***/ 2452:
/*!***********************************!*\
  !*** ./src/app/auth/auth.page.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthPage": () => (/* binding */ AuthPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_auth_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./auth.page.html */ 7837);
/* harmony import */ var _auth_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.page.scss */ 1331);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.service */ 7079);







let AuthPage = class AuthPage {
    constructor(authSer, router, loadingCtrl) {
        this.authSer = authSer;
        this.router = router;
        this.loadingCtrl = loadingCtrl;
        this.isLoading = false;
    }
    ngOnInit() {
    }
    onSignIn() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            this.isLoading = true;
            this.authSer.signIn();
            setTimeout(() => {
                this.isLoading = false;
                this.router.navigateByUrl('/places/discover');
            }, 1500);
            this.presentLoadingController();
        });
    }
    presentLoadingController() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const loading = yield this.loadingCtrl.create({
                message: 'Signing you In....',
                duration: 1500,
                backdropDismiss: false
            });
            yield loading.present();
        });
    }
    submitForm(f) {
        if (!f.valid) {
            return;
        }
        else {
            this.onSignIn();
            f.reset();
            console.log(f.controls);
        }
    }
};
AuthPage.ctorParameters = () => [
    { type: _auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.Router },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.LoadingController }
];
AuthPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-auth',
        template: _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_auth_page_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        styles: [_auth_page_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], AuthPage);



/***/ }),

/***/ 7837:
/*!****************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/auth/auth.page.html ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title class=\"ion-text-center\">Sign-In</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-progress-bar *ngIf=\"isLoading\" type=\"indeterminate\"></ion-progress-bar>\n\n<ion-content>\n  <form #f=\"ngForm\" (ngSubmit)=\"submitForm(f)\">\n    <ion-grid>\n      <ion-row>\n        <ion-col offset=\"0.7\" offset-md=\"1\" offset-sm=\"1\" size=\"10\">\n          <ion-item>\n            <ion-label position=\"floating\" class=\"ion-text-center\"\n              >E-mail</ion-label\n            >\n            <ion-input #emailCtrl=\"ngModel\" required type=\"e-mail\" ngModel name=\"e-mail\"></ion-input>\n            <ion-item lines=\"none\" *ngIf=\"emailCtrl.touched && emailCtrl.invalid\">\n              <ion-label> Please enter an E-mail</ion-label>\n            </ion-item>\n          </ion-item>\n        </ion-col>\n        <ion-col offset=\"0.7\" offset-md=\"1\" offset-sm=\"1\" size=\"10\">\n          <ion-item>\n            <ion-label position=\"floating\" class=\"ion-text-center\"\n              >Password</ion-label\n            >\n            <ion-input\n              required\n              minlength=\"6\"\n              type=\"password\"\n              ngModel\n              name=\"password\"\n              #passwordCtrl=\"ngModel\"\n            ></ion-input>\n            <ion-item lines=\"none\" *ngIf=\"passwordCtrl.touched && passwordCtrl.invalid\">\n              <ion-label> Please enter a Password</ion-label>\n            </ion-item>\n\n          </ion-item>\n        </ion-col>\n        <ion-col offset=\"4.2\" offset-md=\"5.6\" offset-sm=\"5.3\">\n          <ion-button type=\"submit\" *ngIf=\"!isLoading\" color=\"primary\"\n            >Sign-In</ion-button\n          >\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n  </form>\n</ion-content>\n");

/***/ }),

/***/ 1331:
/*!*************************************!*\
  !*** ./src/app/auth/auth.page.scss ***!
  \*************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdXRoLnBhZ2Uuc2NzcyJ9 */";

/***/ })

}]);
//# sourceMappingURL=src_app_auth_auth_module_ts.js.map