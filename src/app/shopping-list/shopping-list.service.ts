import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients() {
        return this.ingredients.slice(); // return a copy, not directly the private variable
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredientToList(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice()); // next instead of emit
    }

    addIngredients(ingredients: Ingredient[]) {
        // do not for loop because there would be too many events emitted
        // spread operator turns array of elements to list of elements because ...
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice()); // next instead of emit
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}