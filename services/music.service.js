// Access our newly created Mongoose Model
var Music = require('../models/music.model.js')

// Saving the context of this module inside the _the variable
_this = this

// Let's use an Async function to get the Book List
exports.getMusics = async function(query, page, limit){

// Set up the mongoose-paginate option
    var options = {
        page,
        limit
    }
// Error Handling 
    
try {
    var musics= await Music.paginate(query, options)
    

    return musics;

} catch (e) {

// Error message if try didn't work

    throw Error('Oh No! We got an error while Paginating our Book List Tasks, so sorry!' )
}
}

exports.createMusic = async function(music){
    
    // Creating a new Mongoose Object by using the new keyword
    
        var newMusic = new Music({
            songName: music.songName,
            singerName: music.singerName,
            status: music.status
        })
        console.log("before save - exports.createMusic" + newMusic);
    
        try{
    
            // Let's go ahead and save the Music
            var savedMusic = await newMusic.save()
            console.log("after save - exports.createMusic");
    
            return savedMusic;
        }catch(e){
          
            //if we can't create a Music we want to throw an error 
            console.error(e);
            console.log(e);
            throw Error("Error while Creating Music")
        }
    }

    exports.updateMusic = async function(music){
        var id = music.id
    
        try{
            //Find the old Music Object by the Id
        
            var oldMusic = await Music.findById(id);
        }catch(e){
            throw Error("Error occured while Finding the Music")
        }
    
        // If no old Music Object exists return false
    
        if(!oldMusic){
            return false;
        }
    
        console.log(oldMusic)
    
        //Edit the Book Object
    
        oldMusic.songName = music.songName
        oldMusic.singerName = music.singerName
        oldMusic.status = music.status
    
    
        console.log(oldMusic)
    
        try{
            var savedMusic = await oldMusic.save()
            return savedMusic;
        }catch(e){
            throw Error("And Error occured while updating the Music");
        }
    }

    exports.deleteMusic = async function(id){
    
        // Delete the Music
    
        try{
            var deleted = await Music.deleteOne({_id: id})
            if(deleted.n === 0){
                throw Error("Music Could not be deleted")
            }
            return deleted
        }catch(e){
            throw Error("Error Occured while Deleting the Music")
        }
    }

