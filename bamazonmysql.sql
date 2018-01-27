DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(55) NOT NULL,
    department_name VARCHAR(55) NOT NULL,
    price DECIMAL(10,2),
    stock_quantity INTEGER(100) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 	("laptop", "electronics", 499.99, 45),
		("drone", "electronics", 799.45, 88),
        ("diamond_ring", "jewelry", 5000, 27),
        ("silver_spoon", "cutlery", 10, 74),
        ("tablet", "electronics", 250, 38),
        ("knives", "cutlery", 15, 89),
        ("necklace", "jewelry", 145, 38),
        ("jeans", "clothing", 50, 100),
        ("shirt", "clothing", 17, 99),
        ("boxers", "underwear", 20, 65);