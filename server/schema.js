const{
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean
} = require('graphql')
const axios = require('axios')
const omdbRootUrl = `http://www.omdbapi.com/?apikey=${process.env.omdbKey}&`
const RatedMovie = require('./models/rated')

const movieType = new GraphQLObjectType({
  name:'movie',
  description: 'movie',
  fields:()=>({
    id:{type:GraphQLString},
    mdbCheck:{type:GraphQLBoolean},
    Title:{type:GraphQLString},
    Year:{type:GraphQLString},
    imdbID:{type:GraphQLString},
    Poster:{type:GraphQLString},
    Plot:{type:GraphQLString},
    Year:{type:GraphQLString},
    Director:{type:GraphQLString},
    Actors:{type:GraphQLString},
    Writer:{type:GraphQLString},
    ThumbsUp:{type:GraphQLInt},
    ThumbsDown:{type:GraphQLInt}
  })
})

//Root Mutation
const RootMutation = new GraphQLObjectType({
  name:'RootMutationType',
  description:'root mutation',
  fields:{//may need anon function?
    addMovie:{
      type:movieType,
      description:'add movie to db',
      args:{
        id:{type:GraphQLNonNull(GraphQLString)},
        mdbCheck:{type:GraphQLNonNull(GraphQLBoolean)},
      },
      resolve:async(parent,args)=>{
        const movie = new RatedMovie({
          id:args.id,
          mdbCheck:true,
          ThumbsUp:0,
          ThumbsDown:0,
        })
        try {
          await movie.save()
          console.log(movie)
          return movie
        } catch (error) {
          console.error(error)
        }
      }
    },
    modifyRating:{
      type:movieType,
      description:'modifies thumbs up / down',
      args:{
        id:{type:GraphQLNonNull(GraphQLString)},
        ThumbsUp:{type:GraphQLNonNull(GraphQLInt)},
        ThumbsDown:{type:GraphQLNonNull(GraphQLInt)}
      },
      resolve: async (parent,args)=>{
        try {
          const updateRating = {
            $set:{
              ThumbsUp:args.ThumbsUp,
              ThumbsDown:args.ThumbsDown,
              mdbCheck:true
            }
          }
          await RatedMovie.findOneAndUpdate({
            id:args.id
          },updateRating,{new: true})
          return args
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
})

//Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description:'root query',
  fields:{
    movies:{//search for movies matching keywords
      type:new GraphQLList(movieType),
      args:{
        searchterm:{type:GraphQLString}
      },
      resolve: async (parent,args)=>{
        const res = await axios.get(omdbRootUrl+`s=${args.searchterm}&type=movie`)
        let movies = res.data.Search
        for(let movie of movies){
          const rating = await RatedMovie.findOne({
            id:movie.imdbID,
          })
          if(rating){
            movie.ThumbsUp = rating.ThumbsUp
            movie.ThumbsDown = rating.ThumbsDown
            movie.mdbCheck = rating.mdbCheck
          }
          const res = await axios.get(omdbRootUrl+`i=${movie.imdbID}&plot=full`)
          const extraInfo = res.data
          movie.id = movie.imdbID
          movie.Plot = extraInfo.Plot
          movie.Actors = extraInfo.Actors
          movie.Director = extraInfo.Director
          movie.Writer = extraInfo.Writer
        }
        return movies
      }
    },
    movie:{//search for single movie. may not use for now
      type:movieType,
      args:{
        imdbID:{type:GraphQLString}
      },
      resolve:async(parent,args)=>{
        const res = await axios.get(omdbRootUrl+`i=${args.imdbID}&plot=full`)
        return res.data
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query:RootQuery,
  mutation:RootMutation
})
