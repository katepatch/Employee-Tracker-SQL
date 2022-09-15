INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO roles (title, salary, department_id)
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

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Dwight", "Shrute", 1, 2),
       ("Michael", "Scott", 2, 3),
       ("David", "Wallace", 3, null),
       ("Stanley", "Hudson", 1, 2),
       ("Henry", "Wu", 4, null),
       ("Allan", "Grant", 5, null),
       ("Ellie", "Sattler", 6, 6),
       ("Linus", "Caldwell", 7, 9),
       ("Rusty", "Ryan", 8, 10),
       ("Danny", "Ocean", 9, null),
       ("Vivian", "Kensington", 10, 12),
       ("Elle", "Woods", 11, null);