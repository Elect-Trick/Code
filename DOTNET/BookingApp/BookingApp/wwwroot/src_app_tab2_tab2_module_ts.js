"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_tab2_tab2_module_ts"],{

/***/ 3092:
/*!*********************************************!*\
  !*** ./src/app/tab2/tab2-routing.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tab2PageRoutingModule": () => (/* binding */ Tab2PageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8163);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5485);
/* harmony import */ var _tab2_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tab2.page */ 442);




const routes = [
    {
        path: '',
        component: _tab2_page__WEBPACK_IMPORTED_MODULE_0__.Tab2Page,
    }
];
let Tab2PageRoutingModule = class Tab2PageRoutingModule {
};
Tab2PageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
    })
], Tab2PageRoutingModule);



/***/ }),

/***/ 4608:
/*!*************************************!*\
  !*** ./src/app/tab2/tab2.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tab2PageModule": () => (/* binding */ Tab2PageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 8163);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 5472);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1109);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 8143);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 1777);
/* harmony import */ var _tab2_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tab2.page */ 442);
/* harmony import */ var _explore_container_explore_container_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../explore-container/explore-container.module */ 581);
/* harmony import */ var _tab2_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tab2-routing.module */ 3092);








let Tab2PageModule = class Tab2PageModule {
};
Tab2PageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
            _angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule,
            _explore_container_explore_container_module__WEBPACK_IMPORTED_MODULE_1__.ExploreContainerComponentModule,
            _tab2_routing_module__WEBPACK_IMPORTED_MODULE_2__.Tab2PageRoutingModule
        ],
        declarations: [_tab2_page__WEBPACK_IMPORTED_MODULE_0__.Tab2Page]
    })
], Tab2PageModule);



/***/ }),

/***/ 442:
/*!***********************************!*\
  !*** ./src/app/tab2/tab2.page.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tab2Page": () => (/* binding */ Tab2Page)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 8163);
/* harmony import */ var _tab2_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tab2.page.html?ngResource */ 4729);
/* harmony import */ var _tab2_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tab2.page.scss?ngResource */ 2650);
/* harmony import */ var _services_live_feed_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../services/live-feed.service */ 5736);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1109);





let Tab2Page = class Tab2Page {
    constructor(liveFeed) {
        this.liveFeed = liveFeed;
        this.sport = {
            id: 0,
            sportName: 'basketball',
            icon: '',
            country: 'argentina',
        };
        this.fixtures = [];
    }
    ngOnInit() {
        this.liveFeed.getFixtures(this.sport).subscribe((response) => {
            this.fixtures.push(response);
        });
    }
};
Tab2Page.ctorParameters = () => [
    { type: _services_live_feed_service__WEBPACK_IMPORTED_MODULE_2__.LiveFeedService }
];
Tab2Page = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-tab2',
        template: _tab2_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_tab2_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], Tab2Page);



/***/ }),

/***/ 2650:
/*!************************************************!*\
  !*** ./src/app/tab2/tab2.page.scss?ngResource ***!
  \************************************************/
/***/ ((module) => {

module.exports = ".left:checked ~ .character {\n  transform: rotateY(180deg);\n}\n\n.right:checked ~ .character {\n  transform: rotateY(360deg);\n}\n\n.character {\n  position: absolute;\n  top: 30%;\n  left: 30%;\n  height: 202px;\n  width: 190px;\n  margin: 2em auto;\n  transform: translate(-50%, -50%);\n  background: transparent url('sprite.png') 0 0 no-repeat;\n  animation: animate 1s steps(6) infinite;\n}\n\n.track {\n  position: fixed;\n  top: 42%;\n  height: 50%;\n  z-index: -1;\n  width: 500%;\n  background-repeat: repeat-x;\n  background: url('road.png');\n  animation: road 2s linear infinite;\n}\n\n@keyframes road {\n  100% {\n    background-position: -1128px;\n  }\n  0% {\n    background-position: 0;\n  }\n}\n\n@keyframes animate {\n  from {\n    background-position: 0;\n  }\n  to {\n    background-position: -1128px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhYjIucGFnZS5zY3NzIiwiLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFxOamFidWxvJTIwTWFqZW5qZVxcRG9jdW1lbnRzXFxHaXRIdWJcXENvZGVcXERPVE5FVFxcQm9va2luZ0FwcFxcQm9va2luZ0FwcFxcZml0LWdcXHNyY1xcYXBwXFx0YWIyXFx0YWIyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNFLDBCQUFBO0FDQUY7O0FERUE7RUFDRSwwQkFBQTtBQ0NGOztBRENBO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQ0FBQTtFQUdBLHVEQUFBO0VBRUEsdUNBQUE7QUNERjs7QURHQTtFQUNFLGVBQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsMkJBQUE7RUFFQSwyQkFBQTtFQUNBLGtDQUFBO0FDREY7O0FESUE7RUFDQztJQUFLLDRCQUFBO0VDQUo7RURFRDtJQUFHLHNCQUFBO0VDQ0Y7QUFDRjs7QURDQTtFQUNFO0lBQ0Usc0JBQUE7RUNDRjtFRENBO0lBQ0UsNEJBQUE7RUNDRjtBQUNGIiwiZmlsZSI6InRhYjIucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5sZWZ0OmNoZWNrZWQgfiAuY2hhcmFjdGVyIHtcclxuICB0cmFuc2Zvcm06IHJvdGF0ZVkoMTgwZGVnKTtcclxufVxyXG4ucmlnaHQ6Y2hlY2tlZCB+IC5jaGFyYWN0ZXIge1xyXG4gIHRyYW5zZm9ybTogcm90YXRlWSgzNjBkZWcpO1xyXG59XHJcbi5jaGFyYWN0ZXIge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDMwJTtcclxuICBsZWZ0OiAzMCU7XHJcbiAgaGVpZ2h0OiAyMDJweDtcclxuICB3aWR0aDogMTkwcHg7XHJcbiAgbWFyZ2luOjJlbSBhdXRvO1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsLTUwJSk7XHJcblxyXG5cclxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXCIuLi8uLi9hc3NldHMvc3ByaXRlLnBuZ1wiKSAwIDAgbm8tcmVwZWF0IDtcclxuICAvLyBib3JkZXI6IDJweCBzb2xpZCByZWQ7XHJcbiAgYW5pbWF0aW9uOiBhbmltYXRlIDFzIHN0ZXBzKDYpIGluZmluaXRlO1xyXG59XHJcbi50cmFja3tcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgdG9wOiA0MiU7XHJcbiAgaGVpZ2h0OiA1MCU7XHJcbiAgei1pbmRleDogLTE7XHJcbiAgd2lkdGg6IDUwMCU7XHJcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xyXG5cclxuICBiYWNrZ3JvdW5kOiB1cmwoJy4uLy4uL2Fzc2V0cy9yb2FkLnBuZycpO1xyXG4gIGFuaW1hdGlvbjogcm9hZCAycyBsaW5lYXIgaW5maW5pdGU7XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgcm9hZCB7XHJcbiAxMDAle2JhY2tncm91bmQtcG9zaXRpb246IC0xMTI4cHg7fVxyXG5cclxuIDAle2JhY2tncm91bmQtcG9zaXRpb246IC0wO31cclxufVxyXG5cclxuQGtleWZyYW1lcyBhbmltYXRlIHtcclxuICBmcm9tIHtcclxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDA7XHJcbiAgfVxyXG4gIHRvIHtcclxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0xMTI4cHg7XHJcbiAgfVxyXG59XHJcbiIsIi5sZWZ0OmNoZWNrZWQgfiAuY2hhcmFjdGVyIHtcbiAgdHJhbnNmb3JtOiByb3RhdGVZKDE4MGRlZyk7XG59XG5cbi5yaWdodDpjaGVja2VkIH4gLmNoYXJhY3RlciB7XG4gIHRyYW5zZm9ybTogcm90YXRlWSgzNjBkZWcpO1xufVxuXG4uY2hhcmFjdGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDMwJTtcbiAgbGVmdDogMzAlO1xuICBoZWlnaHQ6IDIwMnB4O1xuICB3aWR0aDogMTkwcHg7XG4gIG1hcmdpbjogMmVtIGF1dG87XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCB1cmwoXCIuLi8uLi9hc3NldHMvc3ByaXRlLnBuZ1wiKSAwIDAgbm8tcmVwZWF0O1xuICBhbmltYXRpb246IGFuaW1hdGUgMXMgc3RlcHMoNikgaW5maW5pdGU7XG59XG5cbi50cmFjayB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiA0MiU7XG4gIGhlaWdodDogNTAlO1xuICB6LWluZGV4OiAtMTtcbiAgd2lkdGg6IDUwMCU7XG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteDtcbiAgYmFja2dyb3VuZDogdXJsKFwiLi4vLi4vYXNzZXRzL3JvYWQucG5nXCIpO1xuICBhbmltYXRpb246IHJvYWQgMnMgbGluZWFyIGluZmluaXRlO1xufVxuXG5Aa2V5ZnJhbWVzIHJvYWQge1xuICAxMDAlIHtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMTEyOHB4O1xuICB9XG4gIDAlIHtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwO1xuICB9XG59XG5Aa2V5ZnJhbWVzIGFuaW1hdGUge1xuICBmcm9tIHtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwO1xuICB9XG4gIHRvIHtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMTEyOHB4O1xuICB9XG59Il19 */";

/***/ }),

/***/ 4729:
/*!************************************************!*\
  !*** ./src/app/tab2/tab2.page.html?ngResource ***!
  \************************************************/
/***/ ((module) => {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>Header</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n<ion-content [fullscreen]=\"true\">\r\n  <div>\r\n    <input class=\"left\" type=\"radio\" name=\"direction\" />\r\n    <input class=\"right\" type=\"radio\" name=\"direction\" />\r\n    <div class=\"character\"></div>\r\n\r\n  </div>\r\n  <div class=\"track\"></div>\r\n\r\n</ion-content>\r\n";

/***/ })

}]);
//# sourceMappingURL=src_app_tab2_tab2_module_ts.js.map