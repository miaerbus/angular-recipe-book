import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
    ingredientAdded = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients() {
        return this.ingredients.slice(); // return a copy, not directly the private variable
    }

    addToList(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientAdded.next(this.ingredients.slice()); // next instead of emit
    }

    addIngredients(ingredients: Ingredient[]) {
        // do not for loop because there would be too many events emitted
        // spread operator turns array of elements to list of elements because ...
        this.ingredients.push(...ingredients);
        this.ingredientAdded.next(this.ingredients.slice()); // next instead of emit
    }
}