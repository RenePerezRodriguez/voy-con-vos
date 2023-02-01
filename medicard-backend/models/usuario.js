const DataTypes = require('sequelize');
const db = require('../db/connection');

const Usuario = db.define('usuario', {

    nombres: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    apellidos: {
        type: DataTypes.STRING
    },
    ci: {
        type: DataTypes.STRING
    },
    rol: {
        type: DataTypes.STRING,
    },
    codigo: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    fecha_nacimiento: {
        type: DataTypes.STRING
    },
    sexo: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    ciudad: {
        type: DataTypes.STRING
    },
    condiciones: {
        type: DataTypes.BOOLEAN
    },
    fecha_activacion:{
        type: DataTypes.DATE
    },
    estado: {
        type: DataTypes.BOOLEAN,
        default: true
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt:false
});

module.exports = Usuario;