/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Schinetzel',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Schnitzel.JPG/1024px-Schnitzel.JPG',
      ingredients: ['French Fries', 'Chicken meat', 'Salad'],
    },
    {
      id: 'r2',
      title: 'Sphagethi',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/1024px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg',
      ingredients: ['Sphagethi', 'Mince', 'Tomatoes'],
    },
  ];
  constructor() {}

  public getAllRecipes() {
    return [...this.recipes];
  }

  public getRecipe(recipeId: string) {
    return { ...this.recipes.find((x) => x.id === recipeId) };
  }
  public deleteRecipe(recipeId: string) {
this.recipes = this.recipes.filter(x =>{
  return x.id !==recipeId;
}); }
//   public removePerson(name: string)
// {
//   this.persons =this.persons.filter(persons =>{
//     return persons !==name;
//   });
//   this.personsChanged.next(this.persons);
// }
}
