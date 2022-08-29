INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Rep", 65000, 1),
       ("Sales Manager", 90000, 1),
       ("Sales Executive", 115000, 1),
       ("Design Engineer", 135000, 2),
       ("Industrial Engineer", 200000, 2),
       ("Chemical Engineer", 175000, 2),
       ("Accountant", 85000, 3),
       ("Accounting Manager", 125000, 3),
       ("Controller", 155000, 3),
       ("Legal Assistant", 75000, 4),
       ("Lawyer", 275000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dwight", "Shrute", 1),
       ("Michael", "Scott", 2),
       ("David", "Wallace", 3),
       ("Stanley", "Hudson", 1),
       ("Henry", "Wu", 4),
       ("Allan", "Grant", 5),
       ("Ellie", "Sattler", 6),
       ("Linus", "Caldwell", 7),
       ("Rusty", "Ryan", 8),
       ("Danny", "Ocean", 9),
       ("Vivian", "Kensington", 10),
       ("Elle", "Woods", 11);