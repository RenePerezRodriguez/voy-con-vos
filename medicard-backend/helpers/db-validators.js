const Role = require('../models/role');
const  Usuario  = require('../models/usuario');
const { Op } = require("sequelize");
const Codigo = require('../models/codigo');
const moment = require('moment')
const esRoleValido = async(rol = '') => {

    
    if ( rol !== 'USER_ROLE' && rol !== "ADMIN_ROLE" ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}
const validarFecha = async (fechaUsuario) => {
    const fechaA = moment(new Date());
    const fechaM = moment(fechaUsuario);
    const fechaAnio = moment(fechaUsuario).add(1, "year");
    //setDiferencia(fechaF.diff(fechaA, 'days')+1)
    let diff = fechaAnio.diff(fechaA, 'days')+1;
    return diff;
}

const verificarCodigo = async (codigo = '') => {
    const existeCodigo = await Codigo.findOne({
        attributes: ['codigo','numero'],
        where: {
            codigo
        }
    })
    if(existeCodigo){
        const usuario = await Usuario.findAll({
            attributes: ['id', 'nombres','apellidos', 'ci', 'codigo','password', 'email'],
            where: {
                [Op.and]: [
                    {codigo},
                    {estado: true}
                ]
            }
        });

        if(usuario.length > 0){
            throw new Error(`El código: ${codigo} ya está en uso`)
        }
    }else{
        throw new Error (`El código: ${codigo} no es válido`)
    }
}

const emailExiste = async( email = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findAll({
        attributes: ['id', 'nombres','apellidos', 'ci', 'codigo','password', 'email'],
        where: {
            email:{[Op.not]:"" },
            email:{[Op.not]:" "},
            [Op.and]: [
                {email},
                {estado: true},
            ]
        }
    });
    if ( existeEmail.length > 0 ) {
        throw new Error(`El correo: ${ email }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}
module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    verificarCodigo,
    validarFecha
}

