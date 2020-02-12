import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  isEditMode: boolean = false;
  form: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isEditMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.isEditMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImage = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.form = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'image': new FormControl(recipeImage, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    // const newRecipe = new Recipe(this.form.value['name'], this.form.value['description'], this.form.value['image'], this.form.value['ingredients']);
    if (this.isEditMode) {
      this.recipeService.updateRecipe(this.id, this.form.value);
    } else {
      this.recipeService.addRecipe(this.form.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.form.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
   }

   onDeleteIngredient(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
   }

   onCancel() {
     this.router.navigate(['../'], {relativeTo: this.route});
   }
}
