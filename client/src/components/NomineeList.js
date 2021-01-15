import React, {useEffect,useState, useContext} from 'react'
import { Button,DialogTitle,Dialog,DialogContent,DialogContentText,DialogActions,makeStyles} from '@material-ui/core';
import {NomineeContext} from '../hooks/NomineeContext'

const useStyles = makeStyles((theme)=>({
  posterContainer:{
    "&.MuiDialogContent-root":{
      height:'100%'
    },
  width:'100%',
  display:'flex',
  justifyContent: 'center'
  },
  dialogTitle:{
    "& .MuiTypography-root":{
      fontSize:'x-Large'
    },
    textAlign:'center',
    textDecoration: 'underline',
    'fontSize':'x-large'
  },
  nomineeContainer:{
    display:'flex',
    'alignItems':'flex-start'
  },
  poster:{
    'maxWidth':'100%',
    // 'maxHeight':'250px',
    'height':'auto',
    'width':'auto',
  },
  nominee:{
    'maxWidth':'fit-content',
    'display':'flex',
    'flexDirection':'column',
    "&.MuiDialogContent-root:first-child":{
      'paddingTop':'8px'
    }
  },
  nomineeTitle:{
    'textAlign':'center',
    'fontSize':'med'
  },
  buttonContainer:{
    'display': 'flex',
    'justifyContent': 'center'
  },
  removeButton:{
    'backgroundColor':theme.palette.primary.dark,
    'color':'white'
  },
  nomineeActions:{
    'backgroundColor':theme.palette.secondary.pale,
    'paddingBottom':'24px',
    height:'150px'
  }
}
))

export const NomineeList = (props) => {
    const classes = useStyles()
    const nominateContext = useContext(NomineeContext)
    function onClose(){
      props.handleClose()
    }
    const [instructions,setInstructions] = useState(true)

    function removeNominee(event,movie){
      nominateContext.setNominees({...nominateContext.nominees,[movie]:""})
    }

    useEffect(()=>{
      for(let nominee in nominateContext.nominees){
        if(nominateContext.nominees[nominee]){
          setInstructions(false)
          return
        }
        setInstructions(true)
      }
    },[nominateContext.nominees])


    return(
        <Dialog
          open={props.open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className = {classes.root}
          fullWidth = {true}
          maxWidth = 'xl'
        >
        {instructions ?

          <DialogTitle className = {classes.dialogTitle} id="alert-dialog-title">No movies! You can nominate up to five, and they'll be displayed here.</DialogTitle>

        :
        <>
        <DialogTitle className = {classes.dialogTitle} id="alert-dialog-title">Your Nominated Movies</DialogTitle>
          <DialogContent className = {classes.nomineeContainer}>
            {Object.keys(nominateContext.nominees).map((movie)=>{
              return(
                nominateContext.nominees[movie] ?
                <DialogContent key = {movie} className = {classes.nominee}>
                    <img className = {classes.poster} alt = {`poster for ${nominateContext.nominees[movie].poster}`} src = {nominateContext.nominees[movie].poster}/>
                    <DialogContent className = {classes.nomineeActions}>
                      <DialogContentText className = {classes.nomineeTitle}>{nominateContext.nominees[movie].title}</DialogContentText>
                      <DialogActions className = {classes.buttonContainer}>
                        <Button onClick = {(event)=>{removeNominee(event,movie)}} className = {classes.removeButton}>Remove</Button>
                      </DialogActions>

                    </DialogContent>
                </DialogContent>
                :
                ""
              )
            })}
          </DialogContent>
          </>
        }



        </Dialog>

  )
}

