var connection = require("./connection.js");

var orm = {

  selectAll: function(cb) {
    var queryString = "SELECT * FROM burgers";
    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      console.log(result);
      cb(result);
    });
  },
  
  insertOne: function(val) {
    var queryString = "INSERT INTO burgers (burger_name, devoured, date) VALUES (?, FALSE, CURRENT_TIMESTAMP)";
    console.log(queryString);

    // FIRST QUERY TO INSERT NEW DATA TO THE DB
    connection.query(queryString, [val], function(err, result) {
      if (err) {
        throw err;
      }
      console.log(result);
    });
    //SECOND QUERY TO SELECT ALL DATA AND INITIATE THE CALLBACK
    //QUESTION: DOES THIS NEED TO ADDRESS THE ASYNC ISSUE?
    // connection.query("SELECT * FROM burgers", function(err, result) {
    //   if (err) {
    //     throw err;
    //   } 
    //   cb(result);
    // });
  },

  updateOne: function(condition, cb) {
    var queryString = "UPDATE burgers SET devoured = 1 WHERE " + condition;
    console.log(queryString);

    // FIRST QUERY TO UPDATE THE ROW WITH UPDATED BOOLEAN
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
    });
    //SECOND QUERY TO SELECT ALL DATA AND INITIATE THE CALLBACK
    //QUESTION: DOES THIS NEED TO ADDRESS THE ASYNC ISSUE?
    connection.query("SELECT * FROM burgers", function(err, result) {
      if (err) {
        throw err;
      } 
      cb(result);
    });
  }

};

// Export the connection query functions for the burger.js (controller) - object/callback purposes?
module.exports = orm;