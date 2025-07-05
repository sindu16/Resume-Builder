const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  profileImage: {
    data: Buffer,
    contentType: String,
    filename:String,
  }
},{timestamps: true});

module.exports = mongoose.model('User', userSchema);
