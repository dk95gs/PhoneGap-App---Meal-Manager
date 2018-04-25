var db;

function errorHandler(tx, error) {
    console.error("SQL Error: " + tx + " (" + error.code + ") : " + error.message);
}

var DB = {

    createDatabase: function () {
        var shortName = "FinalProjectDB";
        var version = "";
        var displayName = "DB for Final Project App";
        var dbSize = 2 * 1024 * 1024;

        function dbCreateSuccess() {
            console.info("Success: Database created successfully.");
        }
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },
    createTables : function () {
        function txFunction(tx) {
            var sql = "CREATE TABLE IF NOT EXISTS recipes( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "name STRING NOT NULL," +
                "description STRING NOT NULL," +
                "heatLevel STRING NOT NULL," +
                "ingredients TEXT," +
                "directions TEXT);";
            var sql2 = "CREATE TABLE IF NOT EXISTS shoppinglist( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "name STRING NOT NULL," +
                "price DECIMAL NOT NULL);";
            var sql3 = "CREATE TABLE IF NOT EXISTS ingredientsOnHand( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "name STRING NOT NULL," +
                "quantity DECIMAL NOT NULL," +
                "protien DECIMAL NOT NULL, " +
                "carbs DECIMAL NOT NULL," +
                "fat DECIMAL NOT NULL);";
            var options = [];
            function successCreate() {
                console.info("Success: Table created successfully");
            }

            tx.executeSql(sql, options, successCreate, errorHandler);
            tx.executeSql(sql2,options,successCreate,errorHandler);
            tx.executeSql(sql3,options,successCreate,errorHandler);
        }
        function successTransaction() {
            console.info("Success: Create table transaction succeeded.");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropTables: function () {
        function txFunction(tx) {
            var sql = "DROP TABLE IF EXISTS recipes;";
            var sql2 = "DROP TABLE IF EXISTS shoppinglist;";
            var sql3 = "DROP TABLE IF EXISTS ingredientsOnHand;";
            var options = [];
            function successDrop() {
                console.info("Success: Table dropped successfully.");
            }
            tx.executeSql(sql, options, successDrop, errorHandler);
            tx.executeSql(sql2, options, successDrop, errorHandler);
            tx.executeSql(sql3, options, successDrop, errorHandler);

        }
        function successTransaction() {
            console.info("Success: Drop table transaction succeeded.");


        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropRecipeTable : function () {
        function txFunction (tx) {
            var sql = "DROP TABLE IF EXISTS recipes;"

            var options = [];
            function successDrop() {
                console.info("Success dropping recipes table");
            }
            tx.executeSql(sql, options, successDrop, errorHandler);
        }
        function successTransaction() {
            console.info("Success drop table recipes transaction succeded");
        }
        db.transaction(txFunction,errorHandler,successTransaction);
    },
    dropShoppingListTable : function () {
        function txFunction (tx) {
            var sql = "DROP TABLE IF EXISTS shoppingList;"

            var options = [];
            function successDrop() {
                console.info("Success dropping shoppingList table");
            }
            tx.executeSql(sql, options, successDrop, errorHandler);
        }
        function successTransaction() {
            console.info("Success drop table shoppingList transaction succeded");
        }
        db.transaction(txFunction,errorHandler,successTransaction);
    },
    dropIngredientsOnHandTable : function () {
        function txFunction (tx) {
            var sql = "DROP TABLE IF EXISTS ingredientsOnHand;"

            var options = [];
            function successDrop() {
                console.info("Success dropping ingredientsOnHand table");
            }
            tx.executeSql(sql, options, successDrop, errorHandler);
        }
        function successTransaction() {
            console.info("Success drop table ingredientsOnHand transaction succeded");
        }
        db.transaction(txFunction,errorHandler,successTransaction);
    }
};