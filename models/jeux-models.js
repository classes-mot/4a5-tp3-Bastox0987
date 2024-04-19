const mongoose = require('mongoose');

const jeuSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateDeSortie: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Jeux', jeuSchema);
