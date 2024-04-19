const Jeux = require('../models/jeux-models');
const uuid = require('uuid');

// Données de démonstration
let EX_JEUX = [
    {
        titre: 'The Witcher 3: Wild Hunt',
        genre: 'Action-RPG',
        description: 'Un jeu de rôle d\'action en monde ouvert basé sur la série de livres "The Witcher" de l\'auteur polonais Andrzej Sapkowski.',
        dateDeSortie: new Date('2015-05-19')
    }
];

// Obtenir tous les jeux
const getJeux = (req, res, next) => {
    res.json({ jeux: EX_JEUX });
};

// Obtenir tous les jeux depuis la base de données
const getAllJeux = async (req, res, next) => {
    let jeux;
    try {
        jeux = await Jeux.find({});
    } catch (err) {
        return next(new Error('La récupération des jeux a échoué.'));
    }
    res.json({ jeux: jeux.map(jeu => jeu.toObject({ getters: true })) });
};

// Obtenir un jeu par son ID
const getJeuxById = async (req, res, next) => {
    const gameId = req.params.id;
    let jeu;
    try {
        jeu = await Jeux.findById(gameId);
    } catch (err) {
        return next(new Error('La récupération du jeu a échoué.'));
    }

    if (!jeu) {
        return next(new Error('Jeu non trouvé.'));
    }
    res.json({ jeu: jeu.toObject({ getters: true }) });
};

// Ajouter un jeu
const ajouterJeu = async (req, res, next) => {
    const { titre, genre, description, dateDeSortie } = req.body;

    const nouveauJeu = new Jeux({
        titre,
        genre,
        description,
        dateDeSortie
    });

    try {
        await nouveauJeu.save();
    } catch (err) {
        return next(new Error(' création du jeu  échoué.'));
    }

    res.status(201).json({ jeu: nouveauJeu.toObject({ getters: true }) });
};

// Modifier un jeu
const modifierJeu = async (req, res, next) => {
    const { titre, genre, description, dateDeSortie } = req.body;
    const gameId = req.params.id;

    let jeu;
    try {
        jeu = await Jeux.findById(gameId);
    } catch (err) {
        return next(new Error(' récupération du jeu échoué.'));
    }

    if (!jeu) {
        return next(new Error('Jeu non trouvé.'));
    }

    jeu.titre = titre;
    jeu.genre = genre;
    jeu.description = description;
    jeu.dateDeSortie = dateDeSortie;

    try {
        await jeu.save();
    } catch (err) {
        return next(new Error('modification du jeu  échoué.'));
    }

    res.status(200).json({ jeu: jeu.toObject({ getters: true }) });
};

// Supprimer un jeu
const supprimerJeu = async (req, res, next) => {
    const gameId = req.params.id;

    let jeu;
    try {
        jeu = await Jeux.findOneAndDelete({ _id: gameId });
    } catch (err) {
        return next(new Error('Suppression du jeu échouée.'));
    }

    if (!jeu) {
        return next(new Error('Jeu non trouvé.'));
    }

    res.status(200).json({ message: 'Jeu supprimé.' });
};


exports.getJeux = getJeux;
exports.getAllJeux = getAllJeux;
exports.getJeuxById = getJeuxById;
exports.ajouterJeu = ajouterJeu;
exports.modifierJeu = modifierJeu;
exports.supprimerJeu = supprimerJeu;
