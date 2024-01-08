const path = require('path')
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express')
const routes = require('../routes/index')
const errorhandler = require('errorhandler');
module.exports=app=>{

//settings
app.set('port', process.env.PORT ||3000)
app.set('views',  path.join(__dirname, '../views'))
const hbs = exphbs.create({
    defaultLayout: 'main',
    partialsDir: path.join(app.get('views'), 'partials'),
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs',
    helpers: require('./helpers')
  });
  app.engine('.hbs', hbs.engine);
  app.set('view engine', '.hbs');

//middleware
app.use(morgan('dev'))
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/upload/temp'),
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + path.extname(file.originalname));
    }
  })
  
  const upload = multer({ storage: storage });
  
  app.use(upload.single('image')); // 'file' debe coincidir con el nombre del campo del formulario


  app.use(express.urlencoded({extends:false}))
  app.use(express.json());
//routes
routes(app)


//static files
app.use('/public', express.static(path.join(__dirname, '../public')));


//error handlers

if ('development' === app.get('env')) {
  app.use(errorhandler)
}


    return app 
}   