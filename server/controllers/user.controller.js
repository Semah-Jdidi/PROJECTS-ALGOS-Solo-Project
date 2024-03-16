const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = process.env.SECRET_KEY;

module.exports = {
  registerUser: async (req, res) => {
    try{
      const newUser = await User.create(req.body);
      const token = jwt.sign({_id: newUser._id}, secret, {expiresIn: '2h'})
      res.status(201).cookie('token', token, {httpOnly: true, maxAge: 2 * 60 * 60 * 1000}).json({_id: newUser._id, firstName: newUser.firstName, email: newUser.email, token});
    }
    catch(error){ res.status(400).json(error) }
  },

  loginUser: async (req, res) => {
    try{
      const {email, password} = req.body
      const user = await User.findOne({email})
      if(user){
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(passwordMatch){
          const token = jwt.sign({_id: user._id}, secret, {expiresIn: '2h'} )
          res.status(201).cookie('token', token, {httpOnly: true, maxAge: 2 * 60 * 60 * 1000}).json({_id: user._id, firstName: user.firstName, email, token});
        }else{
          res.status(400).json({message: "Invalid Password!"})
        }
      }else{
        res.status(400).json({message: "Email doesn't exist!"})
      }
    }
    catch(error){ res.status(400).json(error) }
  },

  logout: (req, res) => res.clearCookie('token').json({message: "You Logged Out!"}),

};

