const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fetch = require('node-fetch');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '*Pandazippo12',
  database: 'employee_db'
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the employee_db database.');
});

const getDepartments = () => {
  fetch('http://localhost:3001/api/departments')
    .then(response => response.json())
    .then(data => {
      console.log('Departments:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const getRoles = () => {
  fetch('http://localhost:3001/api/roles')
  .then(response => response.json())
  .then(data => {
    console.log('Roles:', data);
  })
  .catch(error => {
    console.log('Error:', error);
  });
};

const getEmployees = () => {
  fetch('http://localhost:3001/api/employees')
  .then(response => response.json())
  .then(data => {
    console.log('Employees:', data);
  })
  .catch(error => {
    console.log('Error:', error);
  });
};

const checkAnswer = choice => {
  if (choice === 'view all departments') {
    getDepartments();
  } else if (choice === 'view all roles') {
    getRoles();
  } else if (choice === 'view all employees') {
    getEmployees();
  } else {
    console.log('Thanks for answering');
  }
};

const promptUser = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'options',
        choices: [
          'view all departments',
          'view all roles',
          'view all employees',
          'add a department',
          'add a role',
          'add an employee',
          'update an employee'
        ]
      }
    ])
    .then(answers => {
      checkAnswer(answers.options);
      promptUser();
    })
    .catch(error => {
      console.error('Error:', error);
    });
};


app.get('/api/departments', (req, res) => {
  const sql = "SELECT * FROM department";

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Success!',
      data: rows
    });
  });
});

app.get('/api/roles', (req, res) => {
  const sql = "SELECT * FROM role";

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Success!',
      data: rows
    });
  });
});

app.get('/api/employees', (req, res) => {
  const sql = "SELECT * FROM employee";

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Success!',
      data: rows
    });
  });
});


app.use((req, res) => {
  res.status(404).end();
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  promptUser(); 
});
