function ValidateAddRecipeForm() {
    var form = $("#addRecipeForm");
    form.validate({
        rules: {
            recipeName:{
                required:true
            },
            recipeDescription:{
                required:true
            }
        },
        messages:{
            recipeName:{
                required: "Recipe name is required"
            },
            recipeDescription: {
                required:"Recipe must have a description"
            }
        }
    });
    return form.valid();
}
function ValidateEditRecipeForm() {
    var form = $("#editRecipeForm");
    form.validate({
        rules: {
            editRecipeName:{
                required:true
            },
            editRecipeDescription:{
                required:true
            }
        },
        messages:{
            editRecipeName:{
                required: "Recipe name is required"
            },
            editRecipeDescription: {
                required:"Recipe must have a description"
            }
        }
    });
    return form.valid();
}
function ValidateAddOnHandIngredient() {
    var form = $("#onHandIngredientsForm");
    form.validate({
        rules: {
            onHandName: {
                required:true
            },
            onHandQuantity: {
                required: true,
                min: 0
            },
            onHandProtien:{
                required: true,
                min: 0
            },
            onHandCarbs: {
                required: true,
                min: 0
            },
            onHandFats: {
                required: true,
                min: 0
            }
        },
        messages:{
            onHandName: {
                required:"Name of the ingredient is required"
            },
            onHandQuantity: {
                required: "Quantity is required",
                min: "Quantity cant be less than 0"
            },
            onHandProtien:{
                required: "Protien is required",
                min: "Protien cant be less than 0"
            },
            onHandCarbs: {
                required: "Must enter Carbs",
                min: "Carbs cant be less than 0"
            },
            onHandFats: {
                required: "Must Enter Fats",
                min: "Fats cannot be less than 0"
            }
        }
    });
    return form.valid();
}
function AjaxWepAppForAllSharedRecipes() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("displaySharedRecipes").innerHTML = this.responseText;
        }
    };

    xmlhttp.open("GET", "https://server-php.azurewebsites.net/selectAll.php", true);
    xmlhttp.send();
}
function ClearIngredientsInstructionsDivs() {
    var htmlcode = "";
    var ingrDiv = $("#displayIngredients");
    ingrDiv = ingrDiv.html(htmlcode);
    var instrDiv = $("#displayInstructions");
    instrDiv = instrDiv.html(htmlcode);
}
function ShareRecipe(){
    if(confirm("Are you sure you want to share your recipe with the world?")) {
        var id = localStorage.getItem("id");
        var options = [id];
        var name = "";
        var description = "";
        var heatLevel = "";
        var ingredients = "";
        var directions = "";

        function callback(tx, results) {
            var row = results.rows.item(0);
            name = row['name'];
            description = row['description'];
            heatLevel = row['heatLevel'];
            ingredients = row['ingredients'];
            directions = row['directions'];
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {

                }
            };

            xmlhttp.open("GET", "https://server-php.azurewebsites.net/insert.php?name=" + name + "&description=" + description +
                "&heatLevel=" + heatLevel + "&ingredients=" + ingredients + "&directions=" + directions, true);
            xmlhttp.send();
        }

        Recipe.select(options, callback);
        $.mobile.changePage("#sharedRecipePage", {transition:'pop'});
    }

}

function DisplayInstructions() {
    var htmlcode = "";
    var instructions = JSON.parse(localStorage.getItem("instructionsArray"));

    for(var i = 0; i < instructions.length; i++)
    {
        var steps = i + 1;
        htmlcode += "<a data-role='button' data-row-id='"+ i + "' href='#' class='ui-btn ui-corner-all'>"+ "Step " + steps.toString() +": " + instructions[i] + "</a>";

    }

    var instrDiv = $("#displayInstructions");
    instrDiv = instrDiv.html(htmlcode);
    $("#displayInstructions a").on("taphold", tapHoldDeleteHandler);
    function tapHoldDeleteHandler() {
        var id = $(this).attr("data-row-id");
        instructions.splice(id, 1);
        localStorage.setItem("instructionsArray", JSON.stringify(instructions));
        DisplayInstructions();
    }
    $("#displayInstructions a").on("click", clickHandler);
    function clickHandler() {
        var id = $(this).attr("data-row-id");
        var edit = prompt("Edit Instruction",instructions[id]);
        if(edit == null || edit == "") {}
        else
        {
            instructions[id] = edit;
        }
        localStorage.setItem("instructionsArray",JSON.stringify(instructions));
        DisplayInstructions();
    }
}
function DisplayIngredients() {
    var htmlcode = "";
    var ingredients = JSON.parse(localStorage.getItem("ingredientsArray"));

    for(var i = 0; i < ingredients.length; i++)
    {
        htmlcode += "<a href='#' data-role='button' data-row-id='"+ i + "' class='ui-btn ui-corner-all'>"+ingredients[i] + "</a>";
    }
    var ingrDiv = $("#displayIngredients");
    ingrDiv = ingrDiv.html(htmlcode);
    $("#displayIngredients a").on("taphold", tapHoldDeleteHandler);
    function tapHoldDeleteHandler() {
        var id = $(this).attr("data-row-id");
        ingredients.splice(id, 1);
        localStorage.setItem("ingredientsArray", JSON.stringify(ingredients));
        DisplayIngredients();
    }
    $("#displayIngredients a").on("click", clickHandler);
    function clickHandler() {
        var id = $(this).attr("data-row-id");
        var edit = prompt("Edit Instruction",ingredients[id]);
        if(edit == null || edit == "") {}
        else
        {
            ingredients[id] = edit;
        }
        localStorage.setItem("ingredientsArray",JSON.stringify(ingredients));
        DisplayIngredients();
    }
    
}
function CreateOrAddToIngredientsArray() {
    var ingredients =  JSON.parse(localStorage.getItem("ingredientsArray"));
    var ingredient = $("#recipeIngredient").val();
    if(ingredients == null)
    {
        ingredients = [ingredient];
        localStorage.setItem("ingredientsArray", JSON.stringify(ingredients));
        DisplayIngredients();

    }
    else
    {
        ingredients.push(ingredient);
        localStorage.setItem("ingredientsArray", JSON.stringify(ingredients));
        DisplayIngredients();
    }
}
function CreateOrAddToInstructionsArray() {
    var instructions =  JSON.parse(localStorage.getItem("instructionsArray"));
    var instruction = $("#recipeInstruction").val();
    if(instructions == null)
    {
        instructions = [instruction];
        localStorage.setItem("instructionsArray", JSON.stringify(instructions));
        DisplayInstructions();
    }
    else
    {
        instructions.push(instruction);
        localStorage.setItem("instructionsArray", JSON.stringify(instructions));
        DisplayInstructions();
    }
}
function AddToEditInstructions() {
    var instructions = JSON.parse(localStorage['writeInstructions']);
    var instruction = $("#editRecipeInstruction").val();

    instructions.push(instruction);
    localStorage.setItem("writeInstructions", JSON.stringify(instructions));
    DisplayEditInstructions();

}
function AddToEditIngredients() {
    var ingredients = JSON.parse(localStorage['writeIngredients']);
    var ingredient = $("#editRecipeIngredient").val();

    ingredients.push(ingredient);
    localStorage.setItem("writeIngredients", JSON.stringify(ingredients));
    DisplayEditIngredients();
}
function DisplayEditIngredients() {
    var ingrHtml = "";
    var ingredients = JSON.parse(localStorage.getItem("writeIngredients"));

    for(var i = 0; i < ingredients.length; i++){
        ingrHtml += "<a href='#' data-role='button' data-row-id='"+i+"' class='ui-btn ui-corner-all'>" + ingredients[i] +"</a>";
    }

    var ingredientView = $("#displayEditedIngredients");
    ingredientView = ingredientView.html(ingrHtml);
    $("#displayEditedIngredients a").on("taphold", tapHoldDeleteHandler);
    function tapHoldDeleteHandler() {
        var id = $(this).attr("data-row-id");
        ingredients.splice(id, 1);
        localStorage.setItem("writeIngredients", JSON.stringify(ingredients));
        DisplayEditIngredients();
    }
    $("#displayEditedIngredients a").on("click", clickHandler);
    function clickHandler() {
        var id = $(this).attr("data-row-id");
        var edit = prompt("Edit Instruction",ingredients[id]);
        if(edit == null || edit == "") {}
        else
        {
            ingredients[id] = edit;
        }
        localStorage.setItem("writeIngredients",JSON.stringify(ingredients));
        DisplayEditIngredients();
    }

}
function DisplayEditInstructions() {
    var instHtml = "";
    var instructions = JSON.parse(localStorage.getItem("writeInstructions"));
    for(var i = 0; i < instructions.length; i++){
        instHtml += "<a href='#' data-role='button' data-row-id='"+ i +"' class='ui-btn ui-corner-all'>Step: "+(i+1).toString()+ " " + instructions[i] +"</a>";
    }
    var instructionView = $("#displayEditedInstructions");
    instructionView = instructionView.html(instHtml);
    $("#displayEditedInstructions a").on("taphold", tapHoldDeleteHandler);
    function tapHoldDeleteHandler() {
        var id = $(this).attr("data-row-id");
        instructions.splice(id, 1);
        localStorage.setItem("writeInstructions", JSON.stringify(instructions));
        DisplayEditInstructions();
    }
    $("#displayEditedInstructions a").on("click", clickHandler);
    function clickHandler() {
        var id = $(this).attr("data-row-id");
        var edit = prompt("Edit Instruction", instructions[id]);
        if (edit == null || edit == "") {
        }
        else {
            instructions[id] = edit;
        }
        localStorage.setItem("writeInstructions", JSON.stringify(instructions));
        DisplayEditInstructions();

    }
}
