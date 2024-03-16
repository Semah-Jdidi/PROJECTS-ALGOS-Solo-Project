const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authenticateUser = async (req, res, next) => {
  const {authorization  } = req.headers;
  if(!authorization) {
    return res.status(401).json({ error: "Token missing!" });
  }

  try {
    const token = authorization.split(' ')[1];
    const {_id} = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findOne({_id});
    next();
  } catch (error){  
      return res.status(401).json({ error: "Invalid Token!" });
  }
};

module.exports = authenticateUser;