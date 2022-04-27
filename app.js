const express = require('express');
const app = express();
const connection = require('./db');
require('dotenv').config();

// Définition du port express
const serverPort = process.env.PORT || 3000;

// Nécessaire pour récupérer le body des requêtes POST et PUT
app.use(express.json())

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