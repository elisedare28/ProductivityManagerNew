const mongoose = require('mongoose');

const users = new mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
      },
});
 
const User = mongoose.model('User', users);
module.exports = User;