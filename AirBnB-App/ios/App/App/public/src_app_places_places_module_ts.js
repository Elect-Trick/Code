"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_places_places_module_ts"],{

/***/ 6969:
/*!**************************************************!*\
  !*** ./src/app/places/discover/discover.page.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DiscoverPage": () => (/* binding */ DiscoverPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_discover_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./discover.page.html */ 1905);
/* harmony import */ var _discover_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./discover.page.scss */ 4185);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/auth/auth.service */ 7079);
/* harmony import */ var _places_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../places.service */ 8897);



/* eslint-disable @typescript-eslint/member-ordering */





let DiscoverPage = class DiscoverPage {
    constructor(loadingCtrl, placesService, authServ, alertCtrl, router) {
        this.loadingCtrl = loadingCtrl;
        this.placesService = placesService;
        this.authServ = authServ;
        this.alertCtrl = alertCtrl;
        this.router = router;
        this.bookablePlaces = [];
    }
    ngOnInit() {
        //  this.placesService.fetchPlaces().subscribe(response =>{
        //   this.presentLoadingController();
        //   this.loadedPlaces = response;
        //   setTimeout(()=>{
        //     this.bookablePlaces = this.loadedPlaces;
        //     if(this.loadedPlaces)
        //   {
        //     this.loadingCtrl.dismiss();
        //   }
        //   },1500);
        //    });
    }
    ionViewWillEnter() {
        this.placesSub = this.placesService.fetchPlaces().subscribe((response) => {
            this.presentLoadingController();
            setTimeout(() => {
                this.loadedPlaces = response;
                this.bookablePlaces = this.loadedPlaces;
                if (this.loadedPlaces) {
                    this.loadingCtrl.dismiss();
                }
            }, 1000);
        }, error => {
            this.presentAlertController();
        });
    }
    ngOnDestroy() {
        if (this.placesSub) {
            this.placesSub.unsubscribe();
        }
    }
    selectedSegment(event) {
        if (event.detail.value === 'all') {
            this.bookablePlaces = this.loadedPlaces;
        }
        else {
            this.bookablePlaces = this.bookablePlaces.filter((z) => z.id === this.authServ.getUserId);
            console.log(this.bookablePlaces.length);
        }
        console.log(event.detail);
    }
    presentLoadingController() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const loading = yield this.loadingCtrl.create({
                message: 'Loading Places',
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
                            this.router.navigate([`/places/discover/`]);
                        },
                    },
                ],
            });
            yield loading.present();
        });
    }
};
DiscoverPage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.LoadingController },
    { type: _places_service__WEBPACK_IMPORTED_MODULE_3__.PlacesService },
    { type: src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.AlertController },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router }
];
DiscoverPage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-discover',
        template: _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_discover_page_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        styles: [_discover_page_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], DiscoverPage);



/***/ }),

/***/ 9265:
/*!**********************************************!*\
  !*** ./src/app/places/offers/offers.page.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OffersPage": () => (/* binding */ OffersPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_offers_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./offers.page.html */ 8620);
/* harmony import */ var _offers_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./offers.page.scss */ 4200);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _places_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../places.service */ 8897);



/* eslint-disable @typescript-eslint/member-ordering */



let OffersPage = class OffersPage {
    constructor(offersService, navCtrl, loadingCtrl) {
        this.offersService = offersService;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.offers = [];
    }
    ngOnInit() { }
    ngOnDestroy() {
        if (this.placesSub) {
            this.placesSub.unsubscribe();
        }
    }
    ionViewWillEnter() {
        this.isLoading = true;
        this.offersService.fetchPlaces().subscribe((response) => {
            this.presentLoadingController();
            setTimeout(() => {
                this.offers = response;
                this.isLoading = false;
            }, 1500);
        });
    }
    navigate() { }
    presentLoadingController() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const loading = yield this.loadingCtrl.create({
                message: 'Loading Places ....',
                duration: 1750,
                backdropDismiss: false,
            });
            yield loading.present();
        });
    }
    onEdit(placeId, slidingItem) {
        slidingItem.close();
        // this.offersService.updateOffer(placeId).subscribe();
    }
};
OffersPage.ctorParameters = () => [
    { type: _places_service__WEBPACK_IMPORTED_MODULE_2__.PlacesService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.NavController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.LoadingController }
];
OffersPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-offers',
        template: _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_offers_page_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        styles: [_offers_page_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], OffersPage);



/***/ }),

/***/ 6922:
/*!*************************************************!*\
  !*** ./src/app/places/places-routing.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlacesPageRoutingModule": () => (/* binding */ PlacesPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 3252);
/* harmony import */ var _discover_discover_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./discover/discover.page */ 6969);
/* harmony import */ var _offers_offers_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./offers/offers.page */ 9265);
/* harmony import */ var _places_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./places.page */ 9328);






const routes = [
    {
        path: '',
        component: _places_page__WEBPACK_IMPORTED_MODULE_2__.PlacesPage,
    },
    {
        path: 'discover',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_places_discover_discover_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./discover/discover.module */ 4034)).then((m) => m.DiscoverPageModule),
        children: [
            { path: 'discover', redirectTo: '/places/discover' },
            {
                path: '',
                component: _discover_discover_page__WEBPACK_IMPORTED_MODULE_0__.DiscoverPage,
            },
            {
                path: 'offers',
                redirectTo: '/places/offers'
            },
            {
                path: ':placeId',
                loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_places_discover_place-detail_place-detail_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./discover/place-detail/place-detail.module */ 4013)).then((m) => m.PlaceDetailPageModule),
            },
        ],
    },
    {
        path: 'offers',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_places_offers_offers_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./offers/offers.module */ 9438)).then((m) => m.OffersPageModule),
        children: [
            {
                path: '',
                component: _offers_offers_page__WEBPACK_IMPORTED_MODULE_1__.OffersPage,
            },
            {
                path: 'offers',
                redirectTo: '/places/offers'
            },
            {
                path: 'discover',
                redirectTo: '/places/discover'
            },
            {
                path: 'new',
                loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_places_offers_new-offer_new-offer_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./offers/new-offer/new-offer.module */ 4697)).then((m) => m.NewOfferPageModule),
            },
            {
                path: ':placeId',
                loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_places_offers_offer-bookings_offer-bookings_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./offers/offer-bookings/offer-bookings.module */ 9372)).then((m) => m.OfferBookingsPageModule),
            },
            {
                path: 'edit/:placeId',
                loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_places_offers_edit-offer_edit-offer_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./offers/edit-offer/edit-offer.module */ 5460)).then((m) => m.EditOfferPageModule),
            },
        ],
    },
    {
        path: 'tabs',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_places_tabs_tabs_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./tabs/tabs.module */ 6906)).then((m) => m.TabsPageModule),
    },
];
let PlacesPageRoutingModule = class PlacesPageRoutingModule {
};
PlacesPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    })
], PlacesPageRoutingModule);



/***/ }),

/***/ 225:
/*!****************************************!*\
  !*** ./src/app/places/places.model.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Place": () => (/* binding */ Place)
/* harmony export */ });
class Place {
    constructor(id, title, description, imageUrl, price, startDate, endDate, userID) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.startDate = startDate;
        this.endDate = endDate;
        this.userID = userID;
    }
}


/***/ }),

/***/ 1629:
/*!*****************************************!*\
  !*** ./src/app/places/places.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlacesPageModule": () => (/* binding */ PlacesPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 8099);
/* harmony import */ var _places_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./places-routing.module */ 6922);
/* harmony import */ var _places_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./places.page */ 9328);
/* harmony import */ var _discover_discover_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./discover/discover.page */ 6969);
/* harmony import */ var _tabs_tabs_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tabs/tabs.page */ 7826);
/* harmony import */ var _offers_offers_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./offers/offers.page */ 9265);










let PlacesPageModule = class PlacesPageModule {
};
PlacesPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonicModule,
            _places_routing_module__WEBPACK_IMPORTED_MODULE_0__.PlacesPageRoutingModule,
        ],
        declarations: [_places_page__WEBPACK_IMPORTED_MODULE_1__.PlacesPage, _discover_discover_page__WEBPACK_IMPORTED_MODULE_2__.DiscoverPage, _tabs_tabs_page__WEBPACK_IMPORTED_MODULE_3__.TabsPage, _offers_offers_page__WEBPACK_IMPORTED_MODULE_4__.OffersPage]
    })
], PlacesPageModule);



/***/ }),

/***/ 9328:
/*!***************************************!*\
  !*** ./src/app/places/places.page.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlacesPage": () => (/* binding */ PlacesPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_places_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./places.page.html */ 1509);
/* harmony import */ var _places_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./places.page.scss */ 4514);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _places_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./places.service */ 8897);





let PlacesPage = class PlacesPage {
    constructor(placesServ) {
        this.placesServ = placesServ;
    }
    ngOnInit() {
        this.placesServ.fetchPlaces().subscribe(response => {
            console.log(response);
        });
    }
};
PlacesPage.ctorParameters = () => [
    { type: _places_service__WEBPACK_IMPORTED_MODULE_2__.PlacesService }
];
PlacesPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-places',
        template: _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_places_page_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        styles: [_places_page_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], PlacesPage);



/***/ }),

/***/ 8897:
/*!******************************************!*\
  !*** ./src/app/places/places.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlacesService": () => (/* binding */ PlacesService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 3981);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 1119);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 8377);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 5029);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 9026);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 6928);
/* harmony import */ var _places_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./places.model */ 225);

/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable arrow-body-style */





let PlacesService = class PlacesService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.places = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject([
        // new Place(
        //   'p1',
        //   'Manhattan Mansion',
        //   'In the heart of New York City.',
        //   'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
        //   149.99,
        //   new Date(),
        //   new Date(),
        //   'abc'
        // ),
        // new Place(
        //   'p2',
        //   'L/Amour Toujours',
        //   'A romantic place in Paris!',
        //   'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
        //   189.99,
        //   new Date(),
        //   new Date(),
        //   'abc'
        // ),
        // new Place(
        //   'p3',
        //   'The Foggy Palace',
        //   'Not your average city trip!',
        //   'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
        //   99.99,
        //   new Date(),
        //   new Date(),
        //   'abc'
        // ),
        ]);
    }
    getPlaces() {
        return this.places.asObservable();
    }
    getPlace(placeId) {
        // This returns a copy of the place so we don't alter the original one.
        return this.httpClient
            .get(`https://udemyairbnb-default-rtdb.firebaseio.com/offered-places/${placeId}.json`)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)((response) => {
            return new _places_model__WEBPACK_IMPORTED_MODULE_0__.Place(placeId, response.title, response.description, response.imageUrl, response.price, new Date(response.startDate), new Date(response.endDate), response.userID);
        }));
        // return this.places.pipe(
        //   take(1),
        //   map((response) => {
        //     return { ...response.find((z) => z.id === placeId) };
        //   }));
    }
    fetchPlaces() {
        return this.httpClient
            .get('https://udemyairbnb-default-rtdb.firebaseio.com/offered-places.json')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)((response) => {
            const places = [];
            for (const key in response) {
                if (response.hasOwnProperty(key)) {
                    places.push(new _places_model__WEBPACK_IMPORTED_MODULE_0__.Place(key, response[key].title, response[key].description, response[key].imageUrl, response[key].price, response[key].startDate, response[key].endDate, response[key].userID));
                }
            }
            return places;
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)((response) => {
            this.places.next(response);
        }));
    }
    addPlace(place) {
        if (place == null) {
            return;
        }
        return this.httpClient
            .post('https://udemyairbnb-default-rtdb.firebaseio.com/offered-places.json', Object.assign(Object.assign({}, place), { id: null }))
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.switchMap)((response) => {
            this.generatedId = response.name;
            return this.places;
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)((places) => {
            place.id = this.generatedId;
            this.places.next(places.concat(place));
        })
        // console.log('http response is',response);
        );
        // return this.places.pipe(
        //   take(1),
        //   delay(1000),
        //   tap((places) => {
        //     this.places.next(places.concat(place));
        //   })
        // );
    }
    updateOffer(place) {
        let updatedPlace;
        return this.places.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.switchMap)((response) => {
            const placeIndex = response.findIndex((z) => z.id === place.id);
            updatedPlace = [...response];
            updatedPlace[placeIndex].description = place.description;
            response[placeIndex].title = place.title;
            updatedPlace[placeIndex] = new _places_model__WEBPACK_IMPORTED_MODULE_0__.Place(place.id, response[placeIndex].title, response[placeIndex].description, place.imageUrl, place.price, place.startDate, place.endDate, place.userID);
            return this.httpClient
                .put(`https://udemyairbnb-default-rtdb.firebaseio.com/offered-places/${place.id}.json`, Object.assign(Object.assign({}, updatedPlace[placeIndex]), { id: null }));
        }));
    }
};
PlacesService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient }
];
PlacesService = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Injectable)({
        providedIn: 'root',
    })
], PlacesService);



/***/ }),

/***/ 7826:
/*!******************************************!*\
  !*** ./src/app/places/tabs/tabs.page.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabsPage": () => (/* binding */ TabsPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_tabs_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./tabs.page.html */ 4419);
/* harmony import */ var _tabs_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabs.page.scss */ 1154);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _places_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../places.service */ 8897);



/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */


let TabsPage = class TabsPage {
    constructor(discovered) {
        this.discovered = discovered;
        this._Places = [];
    }
    ngOnInit() {
        this.placesSub = this.discovered.places.subscribe(response => {
            this._Places = response;
        });
    }
};
TabsPage.ctorParameters = () => [
    { type: _places_service__WEBPACK_IMPORTED_MODULE_2__.PlacesService }
];
TabsPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-tabs',
        template: _C_Users_Njabulo_Majenje_Documents_Code_AirBnB_App_node_modules_ngtools_webpack_src_loaders_direct_resource_js_tabs_page_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        styles: [_tabs_page_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], TabsPage);



/***/ }),

/***/ 1905:
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/places/discover/discover.page.html ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-buttons slot=\"start\">\n      <ion-menu-button> </ion-menu-button>\n      <!-- <ion-back-button [defaultHref]=\"'/places'\"></ion-back-button> -->\n    </ion-buttons>\n    <ion-title class=\"ion-text-center\"> Discover</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-footer>\n  <ion-toolbar>\n    <app-tabs></app-tabs>\n  </ion-toolbar>\n</ion-footer>\n\n<ion-content>\n  <ion-segment value=\"all\" (ionChange)=\"selectedSegment($event)\">\n    <ion-segment-button checked value=\"all\"> All Places </ion-segment-button>\n    <ion-segment-button value=\"bookable\"> Bookable places </ion-segment-button>\n  </ion-segment>\n  <ion-grid *ngIf=\"bookablePlaces.length <=0\">\n    <ion-row>\n      <ion-col size-lg=\"8\" offset-lg=\"2\" class=\"ion-text-center\">\n        <p>There are no bookable places available right now, try again later!</p>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-grid class=\"ion-padding-top\" *ngIf=\"bookablePlaces.length >0\">\n    <ion-row fixed>\n      <ion-col size-lg=\"8\" offset-lg=\"2\" class=\"ion-text-center\">\n        <ion-card>\n          <ion-card-header>\n            <ion-card-title>{{bookablePlaces[0].title}}</ion-card-title>\n            <ion-card-subtitle\n              >{{bookablePlaces[0].price | currency}}/Night</ion-card-subtitle\n            >\n          </ion-card-header>\n\n          <ion-img [src]=\"bookablePlaces[0].imageUrl\"></ion-img>\n          <ion-card-content>\n            <p>{{bookablePlaces[0].description}}</p>\n          </ion-card-content>\n          <div class=\"ion-text-right\">\n            <ion-button\n              fill=\"clear\"\n              color=\"primary\"\n              [routerLink]=\"['./',bookablePlaces[0].id]\"\n              >More</ion-button\n            >\n          </div>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n\n    <ion-row class=\"ion-padding-right\">\n      <ion-col>\n        <!-- Ion virtual scroll takes the place of the ionlist, remove *ngFor and bind an items property, then add *virtualItem to the item tag -->\n        <!-- For better perfomance, you need to apprixomate the list height, therefor give it the approxItemHeight=70px or whatever value you need  -->\n\n        <ion-list>\n          <ion-item\n            *ngFor=\"let place of bookablePlaces.slice(1)\"\n            [routerLink]=\"['./',place.id]\"\n          >\n            <ion-thumbnail slot=\"start\">\n              <ion-img [src]=\"place.imageUrl\"></ion-img>\n            </ion-thumbnail>\n            <ion-label>\n              <h2>{{place.title}}</h2>\n              <p>{{place.description}}</p>\n            </ion-label>\n          </ion-item>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ 8620:
/*!***************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/places/offers/offers.page.html ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar color=\"primary\">\n\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n\n      <!-- <ion-back-button  [defaultHref]=\"'/places'\"></ion-back-button> -->\n    </ion-buttons>\n    <ion-title class=\"ion-text-center\">Offers</ion-title>\n    <ion-button slot=\"end\" [routerLink]=\"['/places/offers/new']\">\n      <ion-icon name=\"add\" slot=\"icon-only\"></ion-icon>\n    </ion-button>\n  </ion-toolbar>\n\n</ion-header>\n<ion-footer>\n  <ion-toolbar>\n    <app-tabs></app-tabs>\n  </ion-toolbar>\n</ion-footer>\n\n\n<ion-content>\n  <ion-grid class=\"ion-padding-top\" *ngIf=\"isLoading===false\">\n    <ion-row >\n      <ion-col size-lg=\"8\" offset-lg=\"2\">\n        <ion-list *ngIf=\"offers.length>0\" >\n          <!-- <p *ngIf=\"\">No offers found</p> -->\n          <ion-item-sliding *ngFor=\"let x of offers\" #slidingItem>\n\n          <ion-item  [routerLink]=\"['./',x.id]\">\n            <ion-thumbnail slot=\"start\">\n              <ion-img [src]=\"x.imageUrl\"></ion-img>\n            </ion-thumbnail>\n            <ion-label>\n              <h2>{{x.title}}</h2>\n              <p>{{x.description}}</p>\n            </ion-label>\n          </ion-item>\n          <ion-item-options>\n            <ion-item-option (click)=\"onEdit(x.id, slidingItem)\" color=\"danger\" [routerLink]=\"['/places/offers/edit/'+x.id]\">\n              <ion-icon name=\"create\" slot=\"icon-only\"></ion-icon>\n            </ion-item-option>\n          </ion-item-options>\n        </ion-item-sliding>\n\n        </ion-list>\n\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n");

/***/ }),

/***/ 1509:
/*!********************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/places/places.page.html ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar color=\"primary\">\n    <ion-title class=\"ion-text-center\">Places</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n<app-tabs></app-tabs>\n</ion-content>\n");

/***/ }),

/***/ 4419:
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/places/tabs/tabs.page.html ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n\n  <ion-tabs >\n    <ion-tab-bar color=\"primary\" slot=\"bottom\">\n      <ion-tab-button tab=\"discover\">\n        <!-- the tab identifier is what's used to navigate to the component in question-->\n<!-- We have to alter the top level component's routes and add these tab routes -->\n        <ion-icon name=\"search\"></ion-icon>\n        <ion-label>Discover</ion-label>\n        <ion-badge>{{_Places.length}}</ion-badge>\n      </ion-tab-button>\n\n      <ion-tab-button tab=\"offers\">\n        <ion-icon name=\"card\"></ion-icon>\n        <ion-label>Offers</ion-label>\n      </ion-tab-button>\n    </ion-tab-bar>\n  </ion-tabs>\n");

/***/ }),

/***/ 4185:
/*!****************************************************!*\
  !*** ./src/app/places/discover/discover.page.scss ***!
  \****************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkaXNjb3Zlci5wYWdlLnNjc3MifQ== */";

/***/ }),

/***/ 4200:
/*!************************************************!*\
  !*** ./src/app/places/offers/offers.page.scss ***!
  \************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJvZmZlcnMucGFnZS5zY3NzIn0= */";

/***/ }),

/***/ 4514:
/*!*****************************************!*\
  !*** ./src/app/places/places.page.scss ***!
  \*****************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwbGFjZXMucGFnZS5zY3NzIn0= */";

/***/ }),

/***/ 1154:
/*!********************************************!*\
  !*** ./src/app/places/tabs/tabs.page.scss ***!
  \********************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0YWJzLnBhZ2Uuc2NzcyJ9 */";

/***/ })

}]);
//# sourceMappingURL=src_app_places_places_module_ts.js.map