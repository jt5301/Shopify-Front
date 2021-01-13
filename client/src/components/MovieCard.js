import React, {useState, useEffect } from 'react'
import { Button,Grid,Card,CardActions,CardActionArea,CardContent,CardMedia,Typography,makeStyles} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import {MoreInfoDialog} from './MoreInfoDialog'
import {gql,useMutation, useApolloClient} from '@apollo/client'

const useStyles = makeStyles((theme)=>({
  cardCounter:{
    display:'flex',
    justifyContent:'space-around'
  },
  counter:{
    fontSize: 'large',
    fontWeight: 'bold',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 275,
  },
  cardMedia: {
    paddingTop: '100%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions:{
    justifyContent: 'center',
  },
  cardButtons:{
    color:theme.palette.secondary.main
  },
  title:{
    "& .MuiTypography-root":{
      fontSize:'x-Large'
    },
    textAlign:'center',
  },
}
))

const ADD_MOVIE = gql`
  mutation addMovie($id:String!,$mdbCheck:Boolean!){
    addMovie(id:$id,mdbCheck:$mdbCheck){
      id
      mdbCheck
    }
  }
`

const MODIFY_RATING = gql`
  mutation modifyRating($id:String!,$ThumbsUp:Int!,$ThumbsDown:Int!){
    modifyRating(id:$id,ThumbsUp:$ThumbsUp,ThumbsDown:$ThumbsDown){
      id
      ThumbsUp
      ThumbsDown
    }
  }
`

const MovieCard = (props) => {
  const [open,setOpen] = useState(false)
  const [ratingButtons, setRatingButtons] = useState({thumbsUp:false,thumbsDown:false})
  let [thumbsUpCounter,setThumbsUp] = useState(0)
  let [thumbsDownCounter,setThumbsDown] = useState(0)
  const [addMovie] = useMutation(ADD_MOVIE)
  const [modifyRating]=useMutation(MODIFY_RATING)

  useEffect(()=>{
    if(props.movie.mdbCheck){
      setThumbsUp(props.movie.ThumbsUp)
      setThumbsDown(props.movie.ThumbsDown)
    }
    else{
      setThumbsUp(0)
      setThumbsUp(0)
    }
  },[props.movie])
  function handleRating (rating){
    if(!props.movie.mdbCheck){
      addMovie({variables:{
        id:props.movie.id,
        mdbCheck:true
      }})
    }
    if(rating === 'up'){
      if(ratingButtons.thumbsDown){
        return
      }
      if(!ratingButtons.thumbsUp){
        setThumbsUp(thumbsUpCounter+=1)
        setRatingButtons({...ratingButtons, thumbsUp:true})
      }
      if(ratingButtons.thumbsUp){
        setThumbsUp(thumbsUpCounter-=1)
        setRatingButtons({...ratingButtons, thumbsUp:false})
      }
    }
    if(rating === 'down'){
      if(ratingButtons.thumbsUp){
        return
      }
      if(!ratingButtons.thumbsDown){
        setThumbsDown(thumbsDownCounter+=1)
        setRatingButtons({...ratingButtons, thumbsDown:true})
      }
      if(ratingButtons.thumbsDown){
        setThumbsDown(thumbsDownCounter-=1)
        setRatingButtons({...ratingButtons, thumbsDown:false})
      }
    }
    modifyRating({variables:{
      id:props.movie.id,
      ThumbsUp:thumbsUpCounter,
      ThumbsDown:thumbsDownCounter
    }})
  }

  function handleOpenDialog(){
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
              <Grid item md={4}>
                <Card className={classes.card}>
                <CardActionArea onClick = {handleOpenDialog}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={props.movie.Poster}
                    title="Image title"
                  />
                </CardActionArea>

                  <CardContent className={classes.cardContent}>
                    <Typography className = {classes.title} gutterBottom variant="h5" component="h2">
                      {props.movie.Title}
                    </Typography>
                  </CardContent>
                  <CardContent className = {classes.cardCounter}>
                    <div className = {classes.counter} style = {{color:'#12395E'}}>
                      {thumbsUpCounter}
                    </div>
                    <React.Fragment></React.Fragment>
                    <div className = {classes.counter} style = {{color:'red'}}>
                      {thumbsDownCounter}
                    </div>
                  </CardContent>
                  <CardActions className = {classes.cardActions}>
                    <Button onClick = {()=>{handleRating('up')}} className = {classes.cardButtons} size="small" color="primary">
                      <ThumbUpIcon/>
                    </Button>
                    <Button className = {classes.cardButtons} size="small" color="primary" onClick = {handleOpenDialog}>
                      More Info
                    </Button>
                    <MoreInfoDialog details = {props.movie} open={open} handleClose={handleClose} />
                    <Button onClick = {()=>{handleRating('down')}} className = {classes.cardButtons} size="small" color="primary">
                      <ThumbDownIcon/>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
  )
}

export default MovieCard



  // useEffect(()=>{
  //   async function getMovieFromDB(){
  //     try {
  //       let res = await axios.get(`/movies/getMovieFromDB/${props.movie.imdbID}`)
  //       if(res.data){
  //         setMovieInDB(true)
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   // getMovieDetails()
  //   getMovieFromDB()
  // },[])
