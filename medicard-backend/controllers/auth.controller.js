const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs')
const { generarJWT } = require('../helpers/generar-jwt');
const { Op } = require("sequelize");

const login = async (req, res=response) => {
    const {correo,password} = req.body;
    try {
        const usuario = await Usuario.findOne({
            where: {
                [Op.or]:[
                    {email:correo},
                    {telefono:correo}
                ]
            }
        })
        if(usuario){
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        console.log(validPassword)
        if ( !validPassword ) {
            return res.status(400).json({
                status:false,
                msg: 'La cuenta no es válida',
            });
        }

        }else{
            return res.status(400).json({
                status:false,
                msg: 'La cuenta no es válida'
            });
        }

        const token = await generarJWT( usuario.id, usuario.rol );
        return res.json({
            status: true,
            token,
            usuario: {
                nombres:usuario.nombres,
                apellidos:usuario.apellidos,
                ciudad:usuario.ciudad,
                ci:usuario.ci,
                rol:usuario.rol,
                email:usuario.email,
                telefono:usuario.telefono,
                codigo:usuario.codigo,
                fecha_activacion: usuario.fecha_activacion
            }

        })
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: 'Hable con el administrador'
        });
    }
   
}

const revalidarToken = async(req, res = response ) => {

    const { usuario } = req;

    // Leer la base de datos
    const dbUser = await Usuario.findOne({
        attributes: ['id', 'nombres','apellidos', 'ci', 'codigo','password', 'rol', 'email'],
        where: {
            id: usuario.id
        }
    });

    // Generar el JWT
    const token = await generarJWT( usuario.id, dbUser.rol );
    return res.json({
        status: true,
        id: usuario.id, 
        name: dbUser.nombres,
        email: dbUser.email,
        token
    });

}

module.exports = {
    login,
    revalidarToken
}

