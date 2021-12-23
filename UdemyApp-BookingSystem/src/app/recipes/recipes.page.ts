/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit, OnDestroy {
recipes: Recipe[];
recipeSub: Subscription;

  constructor(private recipeService: RecipesService) { }

  ngOnInit() {
  console.log('ngOnInit');

  }
  ionViewDidEnter()
  {
    console.log('IonViewDidEnter');
  }
  ionViewWillEnter()
  {
    this.recipes=  this.recipeService.getAllRecipes();

    console.log('IonViewWillEnter');
  }

  ionViewWillLeave()
  {
    console.log('IonViewWIllLeave');

  }
  ionViewDidLeave()
  {
    console.log('IonViewDiDLeave');
  }
  ngOnDestroy(): void {

  }



}
