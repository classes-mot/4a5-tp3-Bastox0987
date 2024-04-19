const express = require('express');
const mongoose = require('mongoose');
const jeuxRoutes = require('./routes/jeux-routes'); // Importer les routes des jeux
const utilisateursRoutes = require('./routes/utilisateurs-routes');
// Importer le gestionnaire d'erreurs
const errorHandler = require('./handler/error-handler');
const app = express();

//Parse le code entrant pour ajouter une propriété body sur la request
app.use(express.json());


app.use('/api/jeux', jeuxRoutes); // Utiliser les routes des jeux
app.use('/api/utilisateurs', utilisateursRoutes); // Utiliser les routes des utilisateurs

// Middleware pour gérer les erreurs d'URL
app.use((req, res, next) => {
    const error = new Error('Route non trouvée.');
    error.status = 404;
    next(error);
});

// Middleware pour gérer les erreurs globales
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'Une erreur inconnue est survenue.' });
});
app.use(errorHandler);
mongoose.connect('mongodb://localhost:27017')
    .then(() => {
        app.listen(5000);
        console.log('Connexion à la base de données réussie.');
    })
    .catch(err => {
        console.log(err);
    });


