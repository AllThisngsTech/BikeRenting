const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var db = mongoose.connection;
if(!db)
    console.log("error connecting with Db");
    else
    console.log("connected to Db");

mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true});// set path to the db and name of the DB
mongoose.Promise=global.Promise;
const rentalsRoutes = require('./api/Routes/rentals');
//const rentOrderRoutes = require('./api/Routes/rent');
const userRoutes = require('./api/Routes/user');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));//parsing simple bodies.
app.use(bodyParser.json());
app.use ((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
     'Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept, Authorization' 
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,GET,DELETE');
        return res.status(200).json({});

    }
    next(); 
});

//routes to handle the requests 
app.use('/rentals',rentalsRoutes);  //filter and handler
//app.use('/rent',rentOrderRoutes);
app.use('/user',userRoutes);
app.use((req, res, next)=>{    //handle all the request that don't satisfy the above routes 
    const error = new Error('Not Found');
    error.status = 404;
    next(error);// forward the error request

})
//db operation
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });

});
module.exports =app;
