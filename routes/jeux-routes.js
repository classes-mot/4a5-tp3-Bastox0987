const express = require('express');
const router = express.Router();
const jeuxController = require('../controllers/jeux-controllers');

// Routes pour les jeux
router.get('/', jeuxController.getJeux);
router.get('/', jeuxController.getAllJeux);
router.get('/:id', jeuxController.getJeuxById);
router.post('/', jeuxController.ajouterJeu);
router.patch('/:id', jeuxController.modifierJeu);
router.delete('/:id', jeuxController.supprimerJeu);

module.exports = router;
