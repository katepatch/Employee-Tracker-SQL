const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
//const { isReadable } = require('stream');  dont know where this came from??

// These just popped up out of nowhere not sure how they got here
// const Connection = require('mysql2/typings/mysql/lib/Connection');
// const { allowedNodeEnvironmentFlags } = require('process');

const PORT = process.env.PORT || 3001;

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Elton!2007',
        database: 'employee_db'
    },
    console.log('Connected to employee_db database')
);

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id' + connection.threadId);
    afterConnection();
});

afterConnection = () => {
    console.log(`
    ╔═══╗─────╔╗──────────────╔═╗╔═╗
    ║╔══╝─────║║──────────────║║╚╝║║
    ║╚══╦╗╔╦══╣║╔══╦╗─╔╦══╦══╗║╔╗╔╗╠══╦═╗╔══╦══╦══╦═╗
    ║╔══╣╚╝║╔╗║║║╔╗║║─║║║═╣║═╣║║║║║║╔╗║╔╗╣╔╗║╔╗║║═╣╔╝
    ║╚══╣║║║╚╝║╚╣╚╝║╚═╝║║═╣║═╣║║║║║║╔╗║║║║╔╗║╚╝║║═╣║
    ╚═══╩╩╩╣╔═╩═╩══╩═╗╔╩══╩══╝╚╝╚╝╚╩╝╚╩╝╚╩╝╚╩═╗╠══╩╝
    ───────║║──────╔═╝║─────────────────────╔═╝║
    ───────╚╝──────╚══╝─────────────────────╚══╝`)
    infoPrompt();
};

const infoPrompt = () => {
    inquirer.prompt ([
        {
            type: 'list', 
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update Employee Role'
            ]
        }
    ])
    .then(answers => {
        const { choices } = answers;

        if (choices === "View All Departments") {
            showDepartments();
        }

        if (choices === "View All Roles") {
            showRoles();
        }

        if (choices === "View All Employees") {
            showEmployees();
        }

        if (choices === "Add a Department") {
            addDepartment();
        }

        if (choices === "Add a Role") {
            addRole();
        }

        if (choices === "Add an Employee") {
            addEmployee();
        }

        if (choices === "Update Employee Role") {
            updateEmployee();
        };
    });
};

showDepartments = () => {
    console.log('Showing all departments \n');
    const sql = `SELECT department.id, department.name AS department FROM department`;

    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        infoPrompt();
    });
};

showRoles = () => {
    console.log('Showing all roles \n');
    const sql = `SELECT roles.id, roles.title, roles.salary, department.name AS department FROM roles LEFT JOIN department ON roles.department_id = department.id`;
    
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        infoPrompt();
    });
};

showEmployees = () => {
    console.log('Showing all Employees \n');
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.id, department.name AS department, roles.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN roles ON employee.roles_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        infoPrompt();
    });    
};

addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: 'What Department would you like to add?',
            validate: addDept => {
                if (addDept) {
                    return true;
                } else {
                    console.log('Please enter new department');
                    return false;
                }
            }
        }
    ])
    .then(answer => {
        const sql = `INSERT INTO department (name)
                    VALUES (?)`;
        connection.query(sql, answer.addDept, (err, result) => {
            if (err) throw err;
            console.log('Added' + answer.addDept + " to departments");

            showDepartments();
        });
    });
};

addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roles',
            message: 'What is the new role?',
            validate: addRole => {
                if (addRole) {
                    return true;
                } else {
                    console.log('Please enter new role');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?',
            validate: addSalary => {
                const pass = addSalary.match(/^[1-9]\d*$/)
                if (pass) {
                    return true;
                } else {
                    console.log('Please enter salary');
                    return false;
                }
            }
        }
    ])
    .then(answer => {
        const params = [answer.roles, answer.salary];

        const roleSql = `SELECT name, id FROM department`;

        connection.query(roleSql, (err, data) => {
            const dept = data.map(({ name, id }) => ({ name: name, value: id }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'dept',
                    message: 'What department is this role in?',
                    choices: dept
                }
            ])
            .then(deptChoice => {
                const dept = deptChoice.dept;
                params.push(dept);

                const sql = `INSERT INTO roles (title, salary, department_id)
                            VALUES (?, ?, ?)`;

                connection.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log('Added' + answer.role + " to roles");

                    showRoles();
                });
            });
        });
    });
};

addEmployee = () => {
    inquirer.prompt ([
        {
            type: 'input', 
            name: 'firstName',
            message: "What is the new employees first name?",
            validate: addFirst => {
                if(addFirst) {
                    return true
                } else {
                    console.log('Please enter employees first name')
                    return false;
                }
            }
        },
        {
            type: 'input', 
            name: 'lastName',
            message: "What is the new employees last name?",
            validate: addLast => {
                if(addLast) {
                    return true
                } else {
                    console.log('Please enter employees last name')
                    return false;
                }
            }
        },
    ])
    .then(answer => {
        const params = [answer.firstName, answer.lastName]

        const roleSql = `SELECT roles.id, roles.title FROM roles`;

        connection.query(roleSql, (err, data) => {
            if (err) throw err;

            const roles = data.map(({ id, title }) => ({ value: id, name: title }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'roles',
                    message: "What is this employee's role?",
                    choices: roles
                }
            ])
            .then(roleChoice => {
                const role = roleChoice.roles;
                params.push(role);
                console.log(params)

                const managerSql =  `SELECT * FROM employee`;

                connection.query(managerSql, (err, result) => {
                    if (err) throw err;
                    const managers = result.map(({ id, first_name, last_name }) => ({ value: id, name: first_name + " "+ last_name }));
                    
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: "Who is this employee's manager?",
                            choices: managers
                        }
                    ])
                    .then(managerChoice => {
                        const manager = managerChoice.manager;
                        params.push(manager);
    
                        const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;
                        
                        connection.query(sql, params, (err, result) => {
                            if (err) throw err;
                            console.log('New employee added');
    
                            showEmployees();
                        });
                    });
                })               
            });
        });
    });
};

updateEmployee = () => {
    const employeeSql = `SELECT * FROM employee`;

    connection.query(employeeSql, (err, data) => {
        if (err) throw err;

        const employees = data.map (({ id, first_name, last_name })=> ({ name: first_name + " "+ last_name, value: id }));

        inquirer.prompt ([
            {
                type: 'list',
                name: 'name',
                message: 'Which employee do you want to update?',
                choices: employees
            }
        ])
        .then(employeeChoice => {
            const employee = employeeChoice.name;
            const params = [];
            params.push(employee);

            const roleSql = `SELECT * FROM roles`;

            connection.query(roleSql, (err, data) => {
                if (err) throw err;

                const roles = data.map(({ id, title }) => ({ name: title, value: id }));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'roles',
                        message: "What is the employee's new role?",
                        choices: roles
                    }
                ])
                .then(roleChoice => {
                    const role = roleChoice.roles;
                    params.push(role);

                    let employee = params[0]
                    params[0] = role
                    params[1] = employee

                    const sql = `UPDATE employee SET roles_id = ? WHERE id = ?`;

                    connection.query(sql, params, (err, result) => {
                        if (err) throw err;
                        console.log('You have successfully updated employee');

                        showEmployees();
                    });
                });
            });
        });
    });
};