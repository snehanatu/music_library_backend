var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var MusicSchema = new mongoose.Schema({
    songName: String,
    singerName: String,
    status: String
})

MusicSchema.plugin(mongoosePaginate)
const Music = mongoose.model('Music', MusicSchema)

module.exports = Music;