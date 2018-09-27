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

const searchStatus = (req, res) => {
  Status.find({})
    .populate("userId")
    .then(result => {
      console.log(result);
      
      let tweet = req.query.tweet;
      let tweetSearch = [];
      result.forEach(element => {
        if (element.status.toLowerCase().indexOf(tweet.toLowerCase()) > -1) {
          tweetSearch.push(element);
        }
      });
      if (tweetSearch) {
        res.status(200).json({
          message: `Success get all status`,
          data: tweetSearch
        });
      } else {
        res.status(400).json({
          message: `Data not found`
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: `Internal Server Error!`
      });
    });
};

const myTweet = (req, res) => {
  let token = req.headers.token;
  let loggedInUser = req.loggedInUser;

  Status.find({
    userId: req.loggedInUser._id
  })
    .populate("userId")
    .sort({ createdAt: "desc" })
    .then(data_tweet => {
      res.status(200).json({
        message: "List of my tweets",
        data: data_tweet
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

module.exports = {
  postStatus,
  allStatus,
  searchStatus,
  myTweet
};
