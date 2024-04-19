const Utilisateur = require('../models/utilisateurs-models');
const uuid = require('uuid');


// Données de démonstration
let EX_UTILISATEUR = [
    {
        nom: 'John',
        email: 'John@gmail.com',
        motDePasse: 'JOHN09'
    }
];
// Obtenir tous les utilisateurs
const getUtilisateurs = (req, res, next) => {
    res.json({ utilisateurs: EX_UTILISATEUR }); // Retourne lexemple en haut 
};

// Obtenir un utilisateur par son ID
const getUtilisateurById = async (req, res, next) => {
    const utilisateurId = req.params.id;
    let utilisateur;
    try {
        utilisateur = await Utilisateur.findById(utilisateurId);
    } catch (err) {
        return next(new Error('La récupération de l\'utilisateur a échoué.'));
    }

    if (!utilisateur) {
        return next(new Error('Utilisateur non trouvé.'));
    }
    res.json({ utilisateur: utilisateur.toObject({ getters: true }) });
};

// Ajouter un utilisateur
const ajouterUtilisateur = async (req, res, next) => {
    const { nom, email, motDePasse } = req.body;

    const nouvelUtilisateur = new Utilisateur({
        nom,
        email,
        motDePasse
    });

    try {
        await nouvelUtilisateur.save();
    } catch (err) {
        return next(new Error('Création de l\'utilisateur échouée.'));
    }

    res.status(201).json({ utilisateur: nouvelUtilisateur.toObject({ getters: true }) });
};

// Modifier un utilisateur
const modifierUtilisateur = async (req, res, next) => {
    const { nom, email, motDePasse } = req.body;
    const utilisateurId = req.params.id;

    let utilisateur;
    try {
        utilisateur = await Utilisateur.findById(utilisateurId);
    } catch (err) {
        return next(new Error('Récupération de l\'utilisateur échouée.'));
    }

    if (!utilisateur) {
        return next(new Error('Utilisateur non trouvé.'));
    }

    utilisateur.nom = nom;
    utilisateur.email = email;
    utilisateur.motDePasse = motDePasse;

    try {
        await utilisateur.save();
    } catch (err) {
        return next(new Error('Modification de lutilisateur échouée.'));
    }

    res.status(200).json({ utilisateur: utilisateur.toObject({ getters: true }) });
};

exports.getUtilisateurs = getUtilisateurs;
exports.getUtilisateurById = getUtilisateurById;
exports.ajouterUtilisateur = ajouterUtilisateur;
exports.modifierUtilisateur = modifierUtilisateur;