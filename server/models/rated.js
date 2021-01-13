const mongoose = require('mongoose')
const ratedSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  ThumbsUp:{
    type:Number,
    required:true
  },
  ThumbsDown:{
    type:Number,
    required:true
  },
  mdbCheck:{
    type:Boolean
  },
})

module.exports = mongoose.model('Movies', ratedSchema)
