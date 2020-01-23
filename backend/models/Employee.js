const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Employee = new Schema ({
    nome: {
        type: String
    },
    email: {
        type: String
    },
    cargo: {
        type: String
    },
    telefone: {
        type: Number
    }
}, {
    collection: 'funcionarios'
});

module.exports = mongoose.model('Employee', Employee);