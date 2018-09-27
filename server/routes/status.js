var express = require('express');
var router = express.Router();
const { allStatus, postStatus, searchStatus, myTweet } = require('../controllers/statusController');
const { isLogin } = require('../middlewares/isLogin');

router.get('/', allStatus)
router.post('/', isLogin, postStatus)
router.get('/search', searchStatus)
router.get('/me', isLogin, myTweet)

module.exports = router;