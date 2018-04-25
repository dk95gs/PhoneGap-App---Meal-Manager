var ShoppingList = {
    insert : function (options, callback) {

        function txFunction(tx) {
            var sql = "INSERT INTO shoppinglist(name,price) values(?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select : function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM shoppinglist WHERE name LIKE ?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll : function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM shoppinglist ORDER BY name;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update : function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE shoppinglist SET name=?, price=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Update transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete : function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM shoppinglist WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};