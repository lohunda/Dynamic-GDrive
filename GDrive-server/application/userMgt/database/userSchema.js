

var mongoose= require($app.common.mongodbConnection);




module.exports = new mongoose.Schema({
  email: String,
  password: String
});
