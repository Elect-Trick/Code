import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit,OnDestroy {
  public loadedRecipe: Recipe;
  constructor(
    private alert: AlertController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((response) => {
      if (!response.has('recipeId')) {
        //redirect
        this.router.navigate(['/recipes']);

        return;
      }
      const recipeId = response.get('recipeId');
      this.loadedRecipe = this.recipeService.getRecipe(recipeId);
      console.log(this.loadedRecipe.ingredients);
    });
  }
  onDeleteRecipe() {
    this.alert
      .create({
        header: 'Confirm',
        message: 'Are you sure you want to delete this?',
        buttons: [
          { text: 'Cancel', role: 'Cancel' },
          {
            text: 'Delete',
            handler: () => {
              this.recipeService.deleteRecipe(this.loadedRecipe.id);
              console.log(this.recipeService.recipes);
              this.router.navigate(['/recipes']);
            },
          },
        ],
      })
      .then((alertEl) => alertEl.present());
  }
  ionViewDidEnter()
  {
    console.log('IonViewDidEnter');
  }
  ionViewWillEnter()
  {

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
    console.log('Page destroyed off the stack');

  }
}
