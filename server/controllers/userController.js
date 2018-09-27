const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllUser = (req, res) => {
  User.find({})
    .then(data => {
      if (data.length == 0) {
        res.status(400).json({
          message: `Cannot get users data`,
          data
        });
      } else {
        res.status(200).json({
          message: `Succes get all users`,
          data
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: `Something is wrong`,
        err
      });
    });
};

const register = (req, res) => {
  const { name, email, password, username } = req.body;
  User.findOne({
    $or: [{ email: email }, { username: username }]
  })
    .then(user => {
      if (!user || user == undefined) {
        User.create({
          name: name,
          username: username,
          email: email,
          password: password
        })
          .then(data => {
            res.status(200).json({
              message: `Welcome new user!`,
              data
            });
          })
          .catch(err => {
            res.status(400).json({
              message: "Please input all fields correctly"
            });
          });
      } else {
        res.status(400).json({
          message: "This account is already exist!"
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const login = (req, res) => {
  const { email, password, username } = req.body;
  User.findOne({
    $or: [{ email: email }, { username: username }]
  })
    .then(data => {
      console.log('masuk data login', data);
      
      if (data) {
        let passwordCheck = bcrypt.compareSync(password, data.password);
        if (passwordCheck) {
          let token = jwt.sign(
            {
              id: data._id,
              name: data.name,
              email: data.email,
              username: data.username
            },
            process.env.jwt_secret
          );
          res.status(200).json({
            message: `Login Success!`,
            token: token,
            email: data.email,
            username: data.username,
            name: data.name
          });
        } else {
          res.status(400).json({
            message: `Password is invalid`
          });
        }
      } else {
        res.status(400).json({
          message: `User is not found`
        });
      }
    })
    .catch(err => {
      console.log('masuk err login', err);
      
      res.status(400).json({
        message: err.message
      });
    });
};

module.exports = {
  getAllUser,
  register,
  login
};
