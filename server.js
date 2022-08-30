const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const Connection = require('mysql2/typings/mysql/lib/Connection');
const { allowedNodeEnvironmentFlags } = require('process');

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

