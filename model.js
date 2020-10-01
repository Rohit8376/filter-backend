const mongoose = require('mongoose')
const mySchema = new mongoose.Schema({
    
     img :{type:String},
     color:{type:String},
     Size:{type:String},
     price:{type:String},
     lifeStyle:{type:String},
     EMI : {type:String}
 })
 

module.exports = mongoose.model('new_data', mySchema);
