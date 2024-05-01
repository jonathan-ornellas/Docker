const express = require('express');
require('dotenv').config();
const mysql = require('mysql');
const faker = require('faker');
const app = express();
const port = 3000;

const pool = mysql.createPool({
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

app.get('/', (req, res) => {
  const page = req.query.page || 1; 
  const limit = 15; 
  const offset = (page - 1) * limit; 

  const randomName = faker.name.findName();
  pool.query('INSERT INTO people(name) VALUES(?)', [randomName], (err, result) => {
    if (err) throw err;

    pool.query('SELECT name FROM people LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
      if (err) throw err;

      let response = '<h1>Full Cycle Rocks!</h1>';
      response += '<h2>Lista de nomes cadastrada no banco de dados.</h2>';
      response += '<ul>';
      results.forEach(person => {
        response += `<li>${person.name}</li>`;
      });
      response += '</ul>';

      response += '<div><a href="/?page=' + (parseInt(page) - 1) + '">Anterior</a> | <a href="/?page=' + (parseInt(page) + 1) + '">Próximo</a></div>';

      res.send(response);
    });
  });
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
