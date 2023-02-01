const DataTypes = require('sequelize');
const db = require('../db/connection');

const Rol = db.define('role', {
    rol: {
        type: DataTypes.STRING
    },
});

module.exports = Rol;
