const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '*Pandazippo12',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

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
 

  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
