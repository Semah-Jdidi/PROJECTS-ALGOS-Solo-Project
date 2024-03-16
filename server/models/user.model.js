const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is Required!"],
    minLength: [2, "First Name Must Be At Least 2 Characters!"]
  },
  lastName: {
    type: String,
    required: [true, "Last Name is Required!"],
    minLength: [2, "Last Name Must Be At Least 2 Characters!"]
  },
  email: {
    type: String,
    required: [true, "Email is Required!"],
    validate: [isEmail, "Invalid Email!"]
  },
  password: {
    type: String,
    required: [true, "Password is Required!"],
    minLength: [8, "Password Must Be At Least 8 Characters!"]
  }
},{timestamps: true});


// Middleware 

UserSchema.virtual('confirmPassword')
  .get(() => this.confirmPassword)
  .set(value => this.confirmPassword = value);

UserSchema.pre('validate', function(next){
  if(this.password !== this.confirmPassword){
    this.invalidate('confirmPassword', "Passwords Don't Match!")
  }
  next();
});

UserSchema.pre('save', function(next){
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

module.exports = mongoose.model('User', UserSchema);