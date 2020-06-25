const mongoose= require('mongoose');
const bikeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    status : {type : Boolean,required:true}
});
module.exports= mongoose.model('Bike', bikeSchema)