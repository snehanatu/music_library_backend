var express = require('express');

var router = express.Router();
var musics = require('./api/musics.route');


router.use('/musics', musics);


module.exports = router;