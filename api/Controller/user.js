const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Bike = require("../models/bike");
const User = require("../models/user");

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              rent_status:req.body.rent_status,
              latitude:req.body.latitude,
              longitude:req.body.longitude
            });
            user.save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                  user:user
              
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};
exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
exports.rent_bike=(req, res, next) => {
  //console.log(req.body);
  User.findById(req.body.userId)
  .then(user => {
      if (!user||user.rent_status===true) {
      return res.status(404).json({
        message: "No User exists or User already has rented a bike" 
    });
  } 
  Bike.findById(req.body.bikeId).then(bike=>{
    if(!bike||bike.status==true){
      return res.status(404).json({
        message: "No bike exists or bike is already rented by a user" 
    });
    }
      if(bike.status===false){
       User.findById(req.body.userId).update({rent_status:true,bikeId:req.body.bikeId},function (err, doc){
       // User.findOneAndUpdate(req.body.userId,{rent_status:true,bikeId:req.body.bikeId},function (err, doc) {
          console.log("in update");
                if (err) {
            
                    console.log("update document error");
            
                } else {
            
                    console.log("update document success\n");
            
                    console.log("result : "+doc);
            
                }
              }); 
              Bike.findByIdAndUpdate(req.body.bikeId,{status:true},function (err, doc){
                console.log("in bike update");
              if (err) {
          
                  console.log("update document error");
          
              } else {
          
                  console.log("update document success\n");
          
                  console.log("result : "+doc);
          
              }});
        return res.status(200).json({
          message: "bike rented" ,
          createdproduct:user
          
          
      }); 
      }
    })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
exports.return_bike=(req, res, next) =>{
  console.log(req.body);
  User.findById(req.body.userId)
  .then(user => {
      if (!user||user.rent_status===false) {
      return res.status(404).json({
        message: "No User exist or User did not rent a bike" 
    });
  } 
      if(user.rent_status===true){
        User.findById(req.body.userId).update({rent_status:false,bikeId:""},function (err, doc){
       // User.findOneAndUpdate(req.body.userId,{rent_status:false,bikeId:""},function (err, doc) {
          //console.log("in update");
                if (err) {
            
                    console.log("update document error");
            
                } else {
            
                    console.log("update document success\n");
            
                    console.log("result : "+doc);
            
                }
              }); 
              id=user.bikeId
              Bike.findByIdAndUpdate(id,{status:false},function (err, doc){
                console.log("in bike update");
              if (err) {
                  console.log("update document error");
          
              } else {
          
                  console.log("update document success\n");
          
                  console.log("result : "+doc);
          
              }});
        return res.status(200).json({
          message: "bike returned"
          
          
      }); 
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  };


exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

