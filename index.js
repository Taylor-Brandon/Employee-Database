const inquirer = require('inquirer');
const fs = require('fs');


const getDepartments = () => {
    fetch('http://localhost:3001/api/departments', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Departments:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

const checkAnswer = (choice) => {
    if (choice === 'view all departments') {
        getDepartments();
    } else {
        console.log('Thanks for answering');
    }
};

inquirer
.prompt ([
    {
        type: 'list',
        message: 'What would you like to do?',
        name:'options',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee'],
    },
])
.then((answers) => {
    checkAnswer(answers.options);
})
.catch((error) => {
    console.error('Error:', error);
});
