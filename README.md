# Employee Tracker SQL

 SQL Project

## Descritption

This project has a CMS interface that allows non-developers an easy way to access and interact with databases.  Here I have created a database for an employer to view all aspects within their company.  Keep track of departments, roles, salaries, and employees.  Employers can even add and update aspects while in the interface.  

## Table of Contents

 -[User Story](#user-story)</br>
 -[Project Criteria](#project-criteria)</br>
 -[Installation](#installation)</br>
 -[Preview](#preview)</br>
 -[Questions](#questions)

## User Story

AS A business owner</br>
I WANT to be able to view and manage the departments, roles, and employees in my company</br>
SO THAT I can organize and plan my business

## Project Criteria

GIVEN a command-line application that accepts user input</br>
WHEN I start the application</br>
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role</br>
WHEN I choose to view all departments</br>
THEN I am presented with a formatted table showing department names and department ids</br>
WHEN I choose to view all roles</br>
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role</br>
WHEN I choose to view all employees</br>
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to</br>
WHEN I choose to add a department</br>
THEN I am prompted to enter the name of the department and that department is added to the database</br>
WHEN I choose to add a role</br>
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database</br>
WHEN I choose to add an employee</br>
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database</br>
WHEN I choose to update an employee role</br>
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Installation

To install this project please clone the repository.</br>
After cloning open the command line in your terminal and run `npm i` to install packages.</br>
Once packages are installed open a new terminal in the `db` folder.  In this terminal you will run `mysql -u root -p` and when prompted please enter your mysql password.</br>
When mysql is open run `source schema.sql` to create database</br>
Then run `source seeds.sql` to seed the database.</br>
Now that the database is set up you can exit that terminal and in the main command line you can run `node server.js` to start server.

## Technologies Used
[mysql2](https://www.npmjs.com/package/mysql2)</br>
[inquirer](https://www.npmjs.com/package/inquirer/v/8.2.4)</br>
[console.table](https://www.npmjs.com/package/console.table)

## Preview

## Questions

If you have questions regarding this project or others you can reach me by:</br>
Email: kate.epatch@gmail.com</br>
Github: [katepatch](https://github.com/katepatch)
