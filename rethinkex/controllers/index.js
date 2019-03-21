/*jshint esversion: 6 */

var express = require('express');
var router = express.Router();
//html dosyaları yolluyor
router.use('/', require('./home'));
//apiler 
router.use('/polls', require('./polls'));

module.exports = router;