import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() selectedRecipeAgain = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is simply a test', 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500/k%2FPhoto%2FRecipes%2F2019-11-recipe-easy-sheet-pan-nachos%2F2019-10-21_Kitchn89063_Easy-Sheet-Pan-Chicken-Nachos'),
    new Recipe('Another recipe', 'Another test', 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500/k%2FPhoto%2FRecipes%2F2019-11-recipe-easy-sheet-pan-nachos%2F2019-10-21_Kitchn89063_Easy-Sheet-Pan-Chicken-Nachos')
  ]

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.selectedRecipeAgain.emit(recipe);
  }
}
