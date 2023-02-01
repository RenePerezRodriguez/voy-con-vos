const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const {uid} = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findOne({
            attributes: ['id','nombres','apellidos', 'ci', 'codigo','password', 'rol', 'email'],
            where: {
                id: uid
            }
        });

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }
                 
        req.usuario = usuario;
        next();

    } catch (error) {

        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}




module.exports = {
    validarJWT
}