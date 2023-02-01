const {Router} = require('express');
const { login, revalidarToken } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt')
const router = Router();

    router.post('/login', [
        check('correo', 'El correo o telefono es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ] ,login );

    router.post( '/renew', validarJWT , revalidarToken );

module.exports = router;