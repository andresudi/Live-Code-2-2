var express = require('express');
var router = express.Router();
const { allStatus, postStatus } = require('../controllers/statusController');
const { isLogin } = require('../middlewares/isLogin');

router.get('/', allStatus)
router.post('/', isLogin, postStatus)

module.exports = router;