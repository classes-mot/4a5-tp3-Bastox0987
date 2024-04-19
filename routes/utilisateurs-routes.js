const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurs-controllers');

// Routes pour les utilisateurs
router.get('/', utilisateurController.getUtilisateurs);
router.get('/:id', utilisateurController.getUtilisateurById);
router.post('/', utilisateurController.ajouterUtilisateur);
router.patch('/:id', utilisateurController.modifierUtilisateur);

module.exports = router;