const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuarioPut, usuarioPost, usuarioDelete, usuarioGet, validarCorreo, usuarioEstado, getUsuariosCiudad, excelUsuarios } = require('../controllers/user.controller');
const { esRoleValido, emailExiste, existeUsuarioPorId, verificarCodigo } = require('../helpers/db-validators');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');
const router = Router();

    router.post('/obtener/usuarios', usuariosGet);

    router.put('/', usuarioPut);

    router.post('/:codigo', usuarioGet);

    router.post('/correo', validarCorreo)
    
    router.post('/cambiar/estado',[
        check("email", "El correo es obligatorio").notEmpty()
    ] ,usuarioEstado)

    router.post('/', [
        check('nombres', 'El nombres es obligatorio').notEmpty(),
        check('apellidos','El apellido es obligatorio').notEmpty(),
        check('ci','El carnet de identidad es obligatorio').notEmpty(),
        check('password','El password es obligatorio').notEmpty().isLength({min: 6}),
        check('fecha_nacimiento', 'La fecha de nacimiento es obligatoria').notEmpty(),
        check('sexo', 'El sexo del paciente es obligatorio').notEmpty(),
        check('rol').custom(esRoleValido),
        check('email').custom(emailExiste),
        check('codigo').custom(verificarCodigo),
        validarCampos
    ], usuarioPost);

    router.delete('/', usuarioDelete);

    router.post('/ciudad/:ciudad', getUsuariosCiudad);

    router.post('/registros/excel', excelUsuarios)

module.exports = router;