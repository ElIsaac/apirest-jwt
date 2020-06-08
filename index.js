const express=require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportMiddleware= require('./config/passport')

//inicializaciones
const app=express();
require('./coneccion')
require('./config/passport')

//configuraciones
app.set('port', process.env.PORT || 3000);


/////////////////////////middlewares///////////////////////

app.use(cors());
app.use(express.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(passport.initialize());


//rutas
app.use(require('./routes/usuarios'));
app.use(require('./routes/noticias'));



//listen del servidor
app.listen(app.get('port'), () =>{
    console.log('servidor en el puerto: ', app.get('port'));
});