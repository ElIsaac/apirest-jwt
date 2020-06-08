const { Strategy, ExtractJwt, StrategyOptions } = require('passport-jwt');
const config = require('./palabra')
const Usuario = require('../models/Usuario')
const passport=require('passport')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.palabra;
passport.use(new Strategy(opts, async (token, done) => {
    //callback de verificacionn
    const usuario = await Usuario.findById(token.id);
    try {
        if (!usuario) {//si el usuario existe
            return done(null, false);
        }
        return done(null, usuario)
    }
    catch (err) {
        console.log(err)
    }
}));
passport.serializeUser((usuario, done) => {
    done(null, usuario._id);
});
////////////se elimina el usuario de la sesion//////
passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, usuario) => {
        done(err, usuario);
    });
});
