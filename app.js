const express = require('express');
const app = express();
const connection = require('./db');
require('dotenv').config();

// Définition du port express
const serverPort = process.env.PORT || 3000;

// Nécessaire pour récupérer le body des requêtes POST et PUT
app.use(express.json())


app.get('/api/superheros', (req, res) => {
  const { gender } = req.query;
  let sql = 'SELECT * FROM heros';

  const queryValues = [];
  if (gender) {
    sql += ' WHERE gender = ?';
    queryValues.push(gender);
  }

  connection.promise().query(sql, queryValues)
    .then(([data]) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Erreur de récupération des heros.');
    });
});


app.get('/api/superheros/:id', (req, res) => {
  const { id } = req.params;

  connection.promise()
    .query('SELECT * FROM heros WHERE id = ?', [id])
    .then(([data]) => {
      if (data.length) {
        res.json(data[0]);
      } else {
        res.sendStatus(404);
      }
    });
});

app.post('/api/superheros', (req, res) => {
  const { name, gender, power, color } = req.body;

  connection.promise()
    .query('INSERT INTO heros (name, gender, power, color) VALUES (?,?,?,?)',
    [name, gender, power, color])
    .then(([data]) => {
      const createdHero = {id: data.insertId, name, gender, power, color};
      res.status(201).json(createdHero);
    }).catch((err) => { console.error(err); res.sendStatus(500); });
});

app.put('/api/superheros/:id', (req, res) => {
  connection.promise()
    .query('UPDATE heros SET ? WHERE id = ?', [req.body, req.params.id])
    .then(() =>  res.sendStatus(200))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.delete('/api/superheros/:id', (req, res) => {
  connection.promise()
    .query('DELETE FROM heros WHERE id = ?', [req.params.id])
    .then(([data]) => {
      if (data.affectedRows) res.sendStatus(204);
      else res.sendStatus(404);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});



// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données');
    console.error(err);
  } else {
    console.log('Connecté à la base de données');
  }
});

// Lancement du server sur le port défini
app.listen(serverPort, () => {
  console.log(`L'application écoute sur le port ${serverPort}`)
});