//var userSchema= require($app.userMgt.userSchema);

module.exports = {
  add:function (userModel) {
    userModel.save();
  },
  update:function(){

  }

}
