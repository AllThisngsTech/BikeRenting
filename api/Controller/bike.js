const Bike = require('../models/bike');
const mongoose= require('mongoose');
const User =require('../models/user');
var http=require('http');

exports.rentals_get_all=(req, res, next)=> {
    Bike.find({status:'false'})
    .select('status _id')
    .exec()
    .then(docs=>{const response={
        count:docs.length,
        bikes:docs
    };
    res.status(200).json(response);
})
    .catch(err =>{
        console.log(err);
        res.status(500).json({error:err})
    });
    
    }
exports.rentals_create_bike=(req, res, next)=> {
     const bike = new Bike({
          _id : new mongoose.Types.ObjectId(),
           userId :req.body.userId,
           status : req.body.status,
        });
        bike.save().then(result =>{
           // console.log(result);
        }).catch(err => console.log(err));
        res.status(201).json({
          message:'created bikes forrentals',
          createdProduct:bike
        });
    } 

    exports.rental_getone=(req, res, next)=> {  
            const id = req.params.bikeId;
      /*   function getTestPersonaLoginCredentials(callback) {

            return http.get({
                host: 'localhost:3000/rentals/',
                path: req.params.bikeId
            }, function(response) {
                // Continuously update stream with data
                var body = '';
                response.on('data', function(d) {
                    body += d;
                });
                response.on('end', function() {
        
                    // Data reception is done, do whatever with it!
                    var parsed = JSON.parse(body);
                    console.log(parsed );
                    
                });
            });
        
        } */
            Bike.findById(id)
        .exec()
        .then(doc=>{
            //console.log("from database",doc);
            if(doc){
                res.status(200).json(doc) 
            }
            else
            {
                res.status(404).json({message:"No valid BikeId found"});
            }
        
        })
        .catch(err=>{
            //console.log(err);
            res.status(500).json({error: err})
        });
        }
    

        exports.delete_rental_one=(req, res, next)=> {
            const id = req.params.bikeId;
            Bike.remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err=>{
                //console.log(err);
                res.status(500).json({error: err});
        });
        }
