var express = require('express')

var router = express.Router()

// Getting the Music Controller that we just created

var MusicController = require('../../controllers/music.controller.js');


// Map each API to the Controller FUnctions

router.get('/', MusicController.getMusics)

router.post('/', MusicController.createMusic)

router.put('/', MusicController.updateMusic)

router.delete('/:id',MusicController.removeMusic)


// Export the Router

module.exports = router;