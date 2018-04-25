function addIngredient_click() {
    CreateOrAddToIngredientsArray();
}
function addInstruction_click() {
    CreateOrAddToInstructionsArray();
}
function submitForm_click() {

    ValidateAndAddToRecipeTable();
}
function RecipesList_show(){
    ShowAllRecipes();
}
function RecipeDetail_show() {
    ShowOneRecipe();
}
function ShoppingList_show() {
    ShowShoppingList();
}

function AddToShoppingList_click() {
    InsertIngredientsToShoppingList();
}
function SelectedIngredients_show() {
    ShowSelectedIngredients();
}
function DeleteAllRecipes_click() {
    DropRecipesTable();
}
function ClearShoppingList_click() {
    DropShoppingListTable();
}
function EditSelectedRecipe_click() {
    EditRecipe();
}
function editInstructionAdd_click() {
    AddToEditInstructions();
}
function editIngredientAdd_click() {
    AddToEditIngredients();
}
function submitEditRecipeForm_click() {
    UpdateRecipe();
}
function ingredientsOnHand_show() {
    ShowAllIngredientsOnHand();
}
function ShowSharedRecipes() {
    AjaxWepAppForAllSharedRecipes();
}
function shareSelectedRecipe_click() {
    ShareRecipe();
}
function addToOnHand_click() {
    AddToOnHandIngredients();
}
function onHandIngredientDetail_show() {
    ShowSelectedOnHandIngredient();
}
function deleteSelectedRecipe_click() {
    DeleteSelectedRecipe();
}
function deleteOnHandIngredient_click() {
    DeleteSelcetedOnHandIngredient();
}
function init() {
    $("#addIngredient").on("click", addIngredient_click);
    $("#addInstruction").on("click", addInstruction_click);
    $("#submitRecipeForm").on("click", submitForm_click);
    $("#recipeListPage").on("pageshow", RecipesList_show);
    $("#recipeDetailPage").on("pageshow",RecipeDetail_show);
    $("#shoppingListPage").on("pageshow", ShoppingList_show);
    $("#ingredientDetailPage").on("pageshow", SelectedIngredients_show);
    $("#AddToShoppingList").on("click",AddToShoppingList_click);
    $("#deleteAllRecipes").on("click", DeleteAllRecipes_click);
    $("#deleteAllShoppingListItems").on("click", ClearShoppingList_click);
    $("#EditRecipe").on("click", EditSelectedRecipe_click);
    $("#editInstruction").on("click", editInstructionAdd_click);
    $("#editIngredient").on("click", editIngredientAdd_click);
    $("#submitEditRecipeForm").on("click", submitEditRecipeForm_click);
    $("#shareRecipe").on("click", shareSelectedRecipe_click);
    $("#iOnHandPage").on("pageshow", ingredientsOnHand_show);
    $("#addToOnHandTable").on("click", addToOnHand_click);
    $("#sharedRecipePage").on("pageshow", ShowSharedRecipes);
    $("#deleteRecipe").on("click", deleteSelectedRecipe_click);
    $("#ingredientOnHandDetailPage").on("pageshow", onHandIngredientDetail_show);
    $("#deleteOnHand").on("click", deleteOnHandIngredient_click);
    localStorage.setItem("ingredientsArray",JSON.stringify([]));
    localStorage.setItem("instructionsArray",JSON.stringify([]));

}
function initDB() {
    console.info("Creating Database ...");
    try {
        DB.createDatabase();
        if (db) {
            DB.createTables();
        }
        else{
            console.error("Error: Cannot create tables: Database does not exist");
        }
    } catch (e) {
        console.error("Error: (Fatal) Error in initDB(). Cannot proceed.");
    }


}

$(document).ready(function () {
    init();
    initDB();

});