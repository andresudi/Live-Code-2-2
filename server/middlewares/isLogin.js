const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const isLogin = (req, res, next) => {
  let token = req.headers.token;
  if (token) {
    let decode = jwt.verify(token, process.env.jwt_secret);
    User.findOne({
      email: decode.email
    })
      .then(data_user => {
        if (data_user) {
          req.loggedInUser = data_user;
          next();
        } else {
          res.status(200).json({
            message: `User not Authenticated!`
          });
        }
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  } else {
    res.status(400).json({
      message: "no token"
    });
  }
};

module.exports = {
  isLogin
};
