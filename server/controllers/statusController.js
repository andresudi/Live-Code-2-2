const Status = require("../models/status");

const postStatus = (req, res) => {
  const { status } = req.body;
  let loggedInUser = req.loggedInUser;

  Status.create({
    status: status,
    userId: loggedInUser.id
  })
    .then(result => {
      res.status(201).json({
        message: `Posted!`,
        data: result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: `no tweet?`
      });
    });
};

const allStatus = (req, res) => {
  Status.find({})
    .populate("userId")
    .sort({ createdAt: "desc" })
    .then(result => {
      res.status(200).json({
        message: `Success get all status`,
        data: result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: `Internal Server Error!`
      });
    });
};

module.exports = {
    postStatus,
    allStatus
};
