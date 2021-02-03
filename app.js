

var express = require("express");
var debug = require("debug") ("app");
var chalk = require("chalk");
var morgan = require ("morgan");
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
var bodyParser = require('body-parser')

errorHandler = require('errorhandler');
var path = require ('path');
var sql = require ('mssql');
const { config } = require("process");



var app = express();
app.use(morgan('dev'));
app.use(express.static( path.join(__dirname,"/public")));
app.use("/css",express.static(path.join(__dirname,"/node_modules/bootstrap/dist/css")));
app.use("/js",express.static(path.join(__dirname,"/node_modules/bootstrap/dist/js")));
app.use("/jquery",express.static(path.join(__dirname,"/node_modules/jquery/dist")));
app.use((req,res,next)=>{
    console.log("my middleware");
    next();
})
app.use(bodyParser.urlencoded({ extended: false }))


// view engine setup
app.set('views',  'views');
app.set('view engine', 'ejs');

var port = process.env.PORT || 3000; 
 const nav =[ { link:"/books",title: "book" } , 
{link:"/author" , title: "Author" } ,
]

var bookRouter = require('./routes/users') (nav);

const swaggerOpt = {
    swaggerDefinition:{
        info:{
           name: "test",
        description:"test api",
    },
    contact:{
        name:"developer"
    },
    servers:["http://localhost:3000"]
},
 apis :[ "./routes/users.js"]
  };
const swaggerDoc = swaggerJSDoc(swaggerOpt);
 app.use( "/api-docs" , swaggerUI.serve , swaggerUI.setup(swaggerDoc));
 app.use('/books',bookRouter);
 
 var dbconfig = {
     server:"your server here",
     user : "stype the user",
     password : "type the password",
     database : "shop",
     port : 1433,
     
     options :{
         encrypt :false
     }
 }
 sql.connect(dbconfig).catch( err=>{ console.log(err)})
 
var server = app.listen( port, function(){
    console.log('Listening on port ' + server.address().port);
  });
