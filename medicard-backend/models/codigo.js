const DataTypes = require('sequelize');
const db = require('../db/connection');

const Codigo = db.define('codigo', {
    numero: {
        type: DataTypes.STRING
    },
    codigo: {
        type: DataTypes.STRING
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt:false
});

module.exports = Codigo;