

var mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION);

module.exports=mongoose;
