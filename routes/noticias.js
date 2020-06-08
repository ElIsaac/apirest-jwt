const { Router } = require('express');
const router = Router();
const Noticia = require('../models/Noticia');
const jwt = require('jsonwebtoken');
const config = require('../config/palabra')
const passport = require('passport');








router.get('/noticias', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const noticias = await Noticia.find().sort({ fecha: "desc" }).lean();
    res.json(noticias).status(200);
});
///////////////////////get de las noticias de cada usuario////////////////////
router.get('/mis-noticias', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const usuarioid = {} = req.user;
    const noticia = await Noticia.find({ id_autor: usuarioid._id }).sort({ fecha: "desc" }).lean();
    nombreUsuario = req.user.nombre;
    res.json(noticia)
});
///////////////////////post de las nuevas noticias/////////////////////////////

router.post('/nueva-noticia', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
        const noticiaNueva = new Noticia();
        noticiaNueva.titulo = req.body.titulo;
        noticiaNueva.descripcion = req.body.descripcion;
        noticiaNueva.autor = req.user.nombre;
        noticiaNueva.id_autor = req.user._id;
        noticiaNueva.fecha = new Date();

        await noticiaNueva.save();
        res.json({ mensaje: "Noticia guardada" }).status(200);
    } catch (err) {
        res.status(400).json({ mensaje: "" + err })
    }
    console.log(req.body)
});

////////////////////////////edicion y borrado de noticias///////////////////////////////////
router.get('/noticia/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const noticia = await Noticia.findById(req.params.id).lean();
    console.log(noticia._id);
    res.json(noticia);
});
router.put('/noticia/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {

    try {
        const { titulo, descripcion } = req.body;
        console.log(req.body);
        await Noticia.findByIdAndUpdate(req.params.id, { titulo, descripcion });
        res.json({ mensaje: "noticia editada correctamente" }).status(200);
    } catch (err) {
        res.json({ mensaje: "" + err }).status(400);
    }

});
router.delete('/noticia/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await Noticia.findByIdAndDelete(req.params.id)
        
        res.json({ mensaje: "noticia eliminada correctamente" }).status(200);
    } catch (err) {
        res.json({ mensaje: "" + err }).status(400);
    }
})
module.exports = router;