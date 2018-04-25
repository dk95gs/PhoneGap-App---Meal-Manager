
var Recipe = {

    insert : function (options, callback) {

        function txFunction(tx) {
            var sql = "INSERT INTO recipes(name,description,heatLevel,ingredients, directions) values(?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select : function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM recipes WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Select transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll : function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM recipes;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update : function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE recipes SET name=?,description=?,heatLevel=?,ingredients=?, directions=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Update transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete : function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM recipes WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
