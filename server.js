const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// These just popped up out of nowhere not sure how they got here
// const Connection = require('mysql2/typings/mysql/lib/Connection');
// const { allowedNodeEnvironmentFlags } = require('process');

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
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
    const sql = `SELECT department.id AS id, department.name AS department FROM department`;

    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        infoPrompt();
    });
};

showRoles = () => {
    console.log('Showing all roles \n');
    const sql = `SELECT role.id, role.title, department.name AS department FROM role
                INNER JOIN department ON role.department_id = department.id`;
    
    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        infoPrompt();
    });
};

showEmployees = () => {
    console.log('Showing all Employees \n');
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager
                FROM employee
                    LEFT JOIN role ON employee.role_id = role id
                    LEFT JOIN department ON role.department_id = department.id
                    LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    
    connection.promise().query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        infoPrompt();
    });
    
};