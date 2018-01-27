var mysql = require("mysql");
var inquirer = require("inquirer");

var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mcg321407",
    database: "bamazon"
});

con.connect(function (err) {

    if (err) throw err;
    console.log("Connected! " + con.threadId);
    showitall();
});

function showitall() {
    con.query("SELECT * FROM products", function (err, result) {
            if (err) throw err;
            for (var i = 0; i < result.length; i++) {
                console.log("Item ID: " + result[i].item_id + ", ..Product Name: " + result[i].product_name + ", ..Department Name: " + result[i].department_name + ", ..Price: " + result[i].price + ", ..Stock Quantity: " + result[i].stock_quantity);
            }
            buy();



            function buy() {
                inquirer.prompt([{
                            name: "idbuy",
                            type: "input",
                            message: "What is the ID of the item you'd like to purchase?"
                        },
                        {
                            name: "units",
                            type: "input",
                            message: "How many units would you like to purchase?"
                        }
                    ])
                    .then(function (answer) {

                            var chosenid = parseInt(answer.idbuy);
                            var chosenunits = parseInt(answer.units);

                            var tableitem;
                            var tablequantity;

                            for (var i = 0; i < result.length; i++) {

                                if (((chosenid) === (result[i].item_id)) && ((chosenunits) < (result[i].stock_quantity))) {

                                    tableitem = result[i].item_id;
                                    tablequantity = parseInt(result[i].stock_quantity);
                                    var cost = parseInt(result[i].price);
                                    var name = result[i].product_name;
                                    var left = (tablequantity-chosenunits);
                                    // console.log("sale can be made for " + (name));
                                    console.log("The total cost of your order of "+(name)+" is: $"+(cost*chosenunits));
                                    console.log("Thanks for shopping. Hava nice day.");

                                    con.query(
                                        "UPDATE products SET ? WHERE ?",
                                        [
                                            {
                                                stock_quantity: left
                                            },
                                            {
                                              item_id: chosenid
                                            }
                                          ]);
                                    
                                } else if (((chosenid) === (result[i].item_id)) && ((chosenunits) > (result[i].stock_quantity))) {
                                    console.log("Insufficient quantity!");
                                    buy();
                                }
                            }

                    
                    });

                };
    






    });

};