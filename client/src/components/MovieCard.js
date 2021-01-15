import React, {useState, useEffect, useContext } from 'react'
import { Button,Grid,Card,CardActions,CardActionArea,CardContent,CardMedia,Typography,makeStyles} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import {MoreInfoDialog} from './MoreInfoDialog'
import {gql,useMutation} from '@apollo/client'
import {NomineeContext} from '../hooks/NomineeContext'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
    maxWidth:270,
    backgroundColor:theme.palette.secondary.pale
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
  const [openInfo,setOpenInfo] = useState(false)
  const [ratingButtons, setRatingButtons] = useState({thumbsUp:false,thumbsDown:false})
  let [thumbsUpCounter,setThumbsUp] = useState(0)
  let [thumbsDownCounter,setThumbsDown] = useState(0)
  const nominateContext = useContext(NomineeContext)
  let [nominatedFlag,setNominatedFlag] = useState(false)
  let [message, setSnackMessage] = useState('')
  let [openSnack, setOpenSnack] = useState(false)
  const [addMovie] = useMutation(ADD_MOVIE)
  const [modifyRating]=useMutation(MODIFY_RATING)

  useEffect(()=>{
    if(!nominateContext.nominees[props.movie.id]){
      setNominatedFlag(false)
    }
  },[nominateContext])
  function handleSnackClose(event,reason){
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false)
  }
  function addMovieToNominees(){
    if(nominatedFlag){
      setOpenSnack(true)
      setSnackMessage(`You've already nominated ${props.movie.Title}.`)
      return
    }
    if(Object.keys(nominateContext.nominees).length===5){
      setOpenSnack(true)
      setSnackMessage("You can only nominate five movies. Remove one from your list first.")
      return
    }
    nominateContext.setNominees({...nominateContext.nominees,[props.movie.id]: {
      title:props.movie.Title,
      poster:props.movie.Poster
      }
    })
    setSnackMessage(`Added ${props.movie.Title} to your list!`)
    setOpenSnack(true)
    setNominatedFlag(true)
  }
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
    setOpenInfo(true)
  }
  const handleClose = () => {
    setOpenInfo(false);
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
                    <Button onClick = {()=>{addMovieToNominees()}} className = {classes.cardButtons} size="small" color="primary">
                      Nominate
                    </Button>
                    <Button onClick = {()=>{handleRating('down')}} className = {classes.cardButtons} size="small" color="primary">
                      <ThumbDownIcon/>
                    </Button>
                  </CardActions>
                </Card>
                <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
        />
                  <MoreInfoDialog details = {props.movie} open={openInfo} handleClose={handleClose} />
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
