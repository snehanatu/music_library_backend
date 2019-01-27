// We need to be able to access the Service 
//that we just created so let's pull that in

var MusicService = require('../services/music.service.js');

// Make sure to save the context of 
//this module inside the _this variable

_this = this

exports.getMusics = async function(req, res, next){

    // We're going to use ternary to check 
    //the existence of the query parameters
        
        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10; 
    
        try{
        
            var musics = await MusicService.getMusics({}, page, limit)
            
    // Return the musics list with the appropriate 
    //HTTP Status Code and Message.
            
            return res.status(200).json({status: 200, data: musics, message: "Succesfully Musics Recieved"});
            
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
            return res.status(400).json({status: 400, message: e.message});
            
        }
    }

    exports.createMusic = async function(req, res, next){

        // Note: Req.Body contains the form submit values.
        console.log(req.body);
        var music = {
            songName: req.body.songName,
            singerName: req.body.singerName,
            status: req.body.status
        }
        console.log(music);
        try{
            
    // Calling the Service function 
    //with the new object from the Request Body
            console.log("before calling service from backend");
        
            var createdMusic = await MusicService.createMusic(music)
            console.log("after calling service from backend");
            return res.status(201).json({status: 201, data: createdMusic, message: "Succesfully Created Music"})
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
    return res.status(400).json({status: 400, message: "Music Creation was Unsuccesfull, I am sorry :( "})
        }
    }

    exports.updateMusic = async function(req, res, next){

        // Id is necessary for the update
    
        if(!req.body._id){
            return res.status(400).json({status: 400., message: "Id must be present"})
        }
    
        var id = req.body._id;
    
        console.log(req.body)
    
        var music = {
            id,
            songName: req.body.songName ? req.body.songName : null,
            singerName: req.body.singerName ? req.body.singerName : null,
            status: req.body.status ? req.body.status : null
        }
    
        try{
            var updatedMusic = await MusicService.updateMusic(music)
            return res.status(200).json({status: 200, data: updatedMusic, message: "Succesfully Updated Music"})
        }catch(e){
            console.log(e.message)
            return res.status(400).json({status: 400, message: e.message})
        }
    }
    
    exports.removeMusic = async function(req, res, next){

        var id = req.params.id;
    
        try{
            var deleted = await MusicService.deleteMusic(id)
            return res.status(204).json({status:204, message: "Succesfully Music Deleted"})
        }catch(e){
            return res.status(400).json({status: 400, message: e.message})
        }
    
    }
    