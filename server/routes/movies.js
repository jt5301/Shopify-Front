const express = require("express");
const router = express.Router();
const omdbRootUrl = `http://www.omdbapi.com/?apikey=${process.env.omdbKey}&`
const axios = require ('axios')
const RatedMovie = require('../models/rated')

router.get("/search/:keywords", async (req, res, next) => {
  const movie = await axios.get(omdbRootUrl+`s=${req.params.keywords}&type=movie`)
  res.status(200).json(movie.data.Search);
});

router.get('/getMoreInfo/:imdbID',async(req,res,next)=>{
  try {
    const movie = await axios.get(omdbRootUrl+`i=${req.params.imdbID}&plot=full`)
    res.status(200).json(movie.data)
  } catch (error) {
    console.error(error)
  }
})

router.get('/getMovieFromDB/:imdbID',async(req,res,next)=>{
  try {
    const movie = await RatedMovie.findOne({
      movieId : req.params.imdbID
    })
    if(!movie){res.status(204).json({})}
    else res.status(200).json(movie)
  } catch (error) {
    console.error(error)
  }
})

router.post('/setMovieRating/:imdbID',async(req,res,next)=>{
  const movie = new RatedMovie({
    movieId:req.params.imdbID,//update here
    thumbsUp:0,//update here
    thumbsDown:0//update here
  })
  try {
    await movie.save()
    res.status(201).json('test success')
  } catch (error) {
    console.error(error)
  }
})

router.put('/changeMovieRating/:imdbID',async(req,res,next)=>{
  try {
    const updateRating = {
      $set: {
         thumbsUp: req.body.thumbsUp,
         thumbsDown:req.body.thumbsDown//update here
      },
   };
    await RatedMovie.updateOne({
      movieId:req.params.imdbID//update here
    },updateRating)
    res.status(200).json('test success')
  } catch (error) {
    console.error(error)
  }
})
module.exports = router;
