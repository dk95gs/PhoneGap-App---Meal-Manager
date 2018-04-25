function DeleteSelcetedOnHandIngredient() {
    if(confirm("Are you sure you want to delete this ingredient?")){
        var id = localStorage.getItem("ingreId");
        var options = [id];
        function callback() {

        }
        IngredientsOnHand.delete(options,callback);
        $.mobile.changePage("#iOnHandPage", {transition:'pop'});
    }
}
function ValidateAndAddToRecipeTable() {
    if(ValidateAddRecipeForm()) {
        var name = $("#recipeName").val();
        var description = $("#recipeDescription").val();
        var heatLevel = $("#recipeHeatLevel").val();
        var recipeIngredients = localStorage.getItem("ingredientsArray");
        var recipeInstructions = localStorage.getItem("instructionsArray");
        var options = [name, description, heatLevel, recipeIngredients, recipeInstructions];

        function callback() {
            console.log("Recipe Insert Success");
        }

        Recipe.insert(options, callback);
        localStorage.removeItem("ingredientsArray");
        localStorage.removeItem("instructionsArray");
        ClearIngredientsInstructionsDivs();
    }
    else
    {
        console.log("Validation did not pass");
    }

}
function DeleteSelectedRecipe() {
    if(confirm("Are you sure you want to delete recipe?")) {
        var id = localStorage.getItem("id");
        var options = [id];

        function callback() {
            console.log("Delete Success");
        }

        Recipe.delete(options, callback);
        $.mobile.changePage("#recipeListPage", {transition: 'pop'});
    }
}
function ShowSelectedOnHandIngredient() {
    var id = localStorage.getItem("ingreId");
    var options = [id];
    function callback(tx,results) {
        var row = results.rows.item(0);
        $("#displayOnHandName").html(row['name']);
        $("#displayQuantity").html(row['quantity']);
        $("#displayProtien").html(row['protien']);
        $("#displayCarbs").html(row['carbs']);
        $("#displayFat").html(row['fat']);
    }
    IngredientsOnHand.select(options,callback);
}
function ShowAllIngredientsOnHand() {
    var options = [];
    function callback(tx, results) {
        var htmlcode = "";

        for(var i = 0; i < results.rows.length; i++){
            var row = results.rows.item(i);

            htmlcode += "<li><a data-role='button' data-row-id='"+ row['id'] + "' href='#'>" +
                "<h1>"+ row['name'] + " Quantity: " + row['quantity'] +"</h1>" +
                "</a></li>";
        }
        var lv = $("#displayIngredientsOnHand");
        lv = lv.html(htmlcode);
        lv.listview("refresh");
        $("#displayIngredientsOnHand a").on("click", clickHandler);
        function clickHandler(){
            localStorage.setItem("ingreId", $(this).attr("data-row-id"));
            $.mobile.changePage("#ingredientOnHandDetailPage", {transition:'pop'});

        }
        $("#displayIngredientsOnHand a").on("taphold",tapHoldHandler);
        function tapHoldHandler() {
            if(confirm("Do you really wish to delete?")){
                var id = $(this).attr("data-row-id");
                var options = [id];
                function callback() {
                    console.info("Deleted record");
                }
                IngredientsOnHand.delete(options,callback);
                ShowAllIngredientsOnHand();
            }
        }
    }
    IngredientsOnHand.selectAll(options,callback);
}
function AddToOnHandIngredients() {
    if(ValidateAddOnHandIngredient()) {
        var name = $("#onHandName").val();
        var quantity = $("#onHandQuantity").val();
        var protien = $("#onHandProtien").val();
        var carbs = $("#onHandCarbs").val();
        var fats = $("#onHandFats").val();

        var options = [name, quantity, protien, carbs, fats];

        function callback() {
            console.log("success insert");
        }

        IngredientsOnHand.insert(options, callback);
        $.mobile.changePage("#iOnHandPage", {transition: 'pop'});
    }
    else
    {
        console.log("Validation did not pass!");
    }

}
function ShowShoppingList() {
    var options =[];

    function callback(tx, results) {
        var htmlcode ="";
        var x = results.rows;

        for(var i = 0; i < results.rows.length; i++){
            var row = results.rows.item(i);

            htmlcode += "<li>" +
                "<a data-role='button' data-row-id='"+ row["id"] +"' data-row-name='"+ row['name'] + "' href='#'>" +
                "<h1>Name:" + row['name'] + "</h1>" +
                "</a>" +
                "</li>";
        }
        var lv = $("#displayShoppingList");
        lv = lv.html(htmlcode);
        lv.listview("refresh");
        $("#displayShoppingList a").on("click", clickHandler);
        function clickHandler(){
            localStorage.setItem("ingredientName", $(this).attr("data-row-name"));

            $.mobile.changePage("#ingredientDetailPage", {transition: 'pop'});
        }
        $("#displayShoppingList a").on("taphold",tapHoldHandler);
        function tapHoldHandler() {
            if(confirm("Do you really wish to delete?")){
                var id = $(this).attr("data-row-id");
                var options = [id];
                function callback() {
                    console.info("Deleted record");
                }
                ShoppingList.delete(options,callback);
                ShowShoppingList();
            }
        }

    }
    ShoppingList.selectAll(options,callback);
}
function ShowSelectedIngredients() {

    var name = localStorage.getItem("ingredientName");
    var options = [name];
    function callback(tx,results) {
        var html = "";
        for(var i = 0; i < results.rows.length; i++){
            var row = results.rows.item(i);

            html += "<li><a data-role='button' data-row-id='"+ row['id'] +"'>" +
                "<h1>"+ row['name']+ "</h1>" +
                "<h1>" + row['price'] +"</h1>" +
                "</a></li>";

        }
        var lv = $("#displaySelectedIngredients");
        lv = lv.html(html);
        lv.listview("refresh");
        $("#displaySelectedIngredients a").on("click", clickHandler);
        function clickHandler() {
            
        }
    }
    ShoppingList.select(options, callback);

}
function ShowAllRecipes() {
    var options =[];

    function callback(tx, results) {
        var htmlcode ="";
        for(var i = 0; i < results.rows.length; i++){
            var row = results.rows.item(i);

            htmlcode += "<li>" +
                "<a data-role='button' data-row-id='"+ row['id'] + "' href='#'>" +
                "<img src='" + row['heatLevel'] +"'>" +
                "<h1>Name:" + row['name'] + "</h1>" +
                "<p>Description:" + row['description'] + "</p>" +
                "</a>" +
                "</li>";
        }
        var lv = $("#displayRecipesList");
        lv = lv.html(htmlcode);
        lv.listview("refresh");
        $("#displayRecipesList a").on("click", clickHandler);
        function clickHandler() {
            localStorage.setItem("id",$(this).attr("data-row-id"));
            var id = $(this).attr("data-row-id");
            var options = [id];

            function callback(tx, results) {
                var row = results.rows.item(0);

                localStorage.setItem("writeIngredients", row['ingredients']);
                localStorage.setItem("writeInstructions", row['directions']);

            }
            Recipe.select(options,callback);
            $.mobile.changePage("#recipeDetailPage", {transition:'pop'});
        }

    }
    Recipe.selectAll(options,callback);
}
function ShowOneRecipe() {
    var id = localStorage.getItem("id");
    var options = [id];
    var ingrHtml ="";
    var instrHtml ="";
    function callback(tx, results) {
        var row = results.rows.item(0);
        var ingredients = JSON.parse(row['ingredients']);
        var instructions = JSON.parse(row['directions']);
        $("#displayRecipeName").html(row['name']);
        $("#displayDescription").html(row['description']);
        $("#displayHeatLevel").html("<img src='"+ row['heatLevel']+ "'>");
        for (var i = 0; i < ingredients.length;  i++){
            ingrHtml += "<a data-role='button' class='ui-btn ui-corner-all'><li>"+ingredients[i]+"</li></a>";
        }
        for (var x = 0; x < instructions.length;  x++){
            instrHtml += "<a data-role='button' class='ui-btn ui-corner-all'><li>Step: "+(x+1).toString()+" "+instructions[x]+"</li></a>";
        }
        var ingrLv = $("#ingredients");
        ingrLv = ingrLv.html(ingrHtml);
        var instrLv = $("#instructions");
        instrLv = instrLv.html(instrHtml);
        ingrLv.listview("refresh");
        instrLv.listview("refresh");

    }
    Recipe.select(options, callback);
}
function EditRecipe() {
    var id = localStorage.getItem("id");
    var options = [id];

    function callback(tx,results) {
        var row = results.rows.item(0);
        $("#editRecipeName").val(row['name']);
        $("#editRecipeDescription").val(row['description']);
        $("#editRecipeHeatLevel").val(row['heatLevel']);
        DisplayEditIngredients();
        DisplayEditInstructions();

    }
    Recipe.select(options, callback);
    $.mobile.changePage("#editRecipePage", {transition:'pop'});
}
function UpdateRecipe() {
    if(ValidateEditRecipeForm()) {
        var id = localStorage.getItem("id");
        var name = $("#editRecipeName").val();
        var description = $("#editRecipeDescription").val();
        var heatLevel = $("#editRecipeHeatLevel").val();
        var ingredients = localStorage.getItem("writeIngredients");
        var instructions = localStorage.getItem("writeInstructions");

        function callback() {
            console.log("Update: Success");
        }

        var options = [name, description, heatLevel, ingredients, instructions, id];
        Recipe.update(options, callback);
    }
    else
    {
        console.log("Validation not passed");
    }

}
function InsertIngredientsToShoppingList() {
    if(confirm("Add to shopping list?")) {
        var ingredients = JSON.parse(localStorage.getItem("writeIngredients"));

        function shoppingListCallback() {
        }

        for (var i = 0; i < ingredients.length; i++) {
            var input = [ingredients[i], ""];
            ShoppingList.insert(input, shoppingListCallback);
        }
        $.mobile.changePage("#shoppingListPage",{transition:'pop'});
    }
}
function DropRecipesTable() {
    if(confirm("Are you sure you want to delete all recipes?")) {
        DB.dropRecipeTable();
        alert("Successfully Deleted All Recipes");
        location.reload();
    }
}
function DropShoppingListTable() {
    if(confirm("Are you sure you want to clear your shopping list?")) {
        DB.dropShoppingListTable();
        alert("Successfully Deleted All Shopping List Items");
        location.reload();
    }
}