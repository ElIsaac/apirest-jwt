const { Router } = require('express');
const router = Router();
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const config = require('../config/palabra')
const passport=require('passport');

router.get('/prueba', passport.authenticate('jwt', {session: false}), (req,res) =>{
    res.send('ok');
});

router.post('/registrate', async (req, res) => {
    try {

        const { nombre,
            email,
            contrasenia } = req.body;

        const usuarioNuevo = new Usuario({
            nombre,
            email,
            contrasenia
        });
        usuarioNuevo.contrasenia = await usuarioNuevo.encriptar(contrasenia);
        await usuarioNuevo.save();

        const token = jwt.sign({ id: usuarioNuevo.id }, config.palabra, {
            expiresIn: 60 * 60 * 24
        });

        res.json({ auth: true, token });

    } catch (e) {
        console.log(e)
        res.status(500).send('There was a problem registering your user');
    }
});
router.post('/inicia-sesion', async (req, res, next) => {

    const usuario = await Usuario.findOne({ email: req.body.email });
    try {

        if (!usuario) {
            res.status(404).json({ mensaje: "ese usuario no existe" })
        }

        const contraseniaValida = await usuario.matchPassword(req.body.contrasenia, usuario.contrasenia);
        if (!contraseniaValida) {
            res.status(400).json({ mensaje: "contraseña incorrecta" })
        }
        const token = jwt.sign({ id: usuario._id }, config.palabra, {
            expiresIn: 60 * 60 * 24
        });

        res.status(200).json({ auth: true, token });
    } catch (e) {
        console.log(e)
        res.status(500).json({ mensaje: "no se pudo iniciar" });
    }
});
router.get('/cerrar-sesion', (req, res) => {
    //req.logout() viene en passport
    req.logout();
    res.status(200).json({ mensaje: "sesion cerrada" });
   });
module.exports = router;
/*

 */