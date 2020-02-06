import { EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [
        new Recipe('A test recipe', 'This is simply a test', 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500/k%2FPhoto%2FRecipes%2F2019-11-recipe-easy-sheet-pan-nachos%2F2019-10-21_Kitchn89063_Easy-Sheet-Pan-Chicken-Nachos'),
        new Recipe('Another recipe', 'Another test', 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500/k%2FPhoto%2FRecipes%2F2019-11-recipe-easy-sheet-pan-nachos%2F2019-10-21_Kitchn89063_Easy-Sheet-Pan-Chicken-Nachos')
    ];

    getRecipes() {
        return this.recipes.slice(); // return a copy, not directly the private variable
    }
}