
// load the things we need
var express = require('express');
var app = express();
const cors = require('cors')
require(`dotenv`).config();
//var bodyParser = require('body-parser')
//router.use(bodyParser.urlencoded({extended: false}))
//router.use(bodyParser.json)
//a partir de Express 4.16.0 se usa express.urlencoded({ extended: true }))


app.use(cors({origin: true}));

////const { bd } = require('../BD/connectionBD')
const bd = require("../BD/connectionBD");
////
const routes = require('./routes/index.routes')
const path = require('path')
// set the view engine to ejs
app.set('view engine', 'ejs')
app.set('views', __dirname+'/views');   //Directorio que contiene las vistas

app.use(express.static( 'public'))
//app.use(express.static('public'));


// Configuración del middleware para analizar el cuerpo de la solicitud
app.use(express.urlencoded({ extended: true }));
///para ver el cuerpo de un Json en el servidor
app.use(express.json());
// app.use('/don',require('./public/don'))
// app.get('/api/index',  (req, res) => {
//     res.send('11111respuesta desde el servidor');
//     //res.render('index');
//   } )
  
app.use('/api',routes)


const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`${PORT} is the magic port`);