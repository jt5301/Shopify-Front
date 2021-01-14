import React, { useContext, useState } from 'react'
import { Button,Toolbar,Typography,TextField,makeStyles,AppBar} from '@material-ui/core';
import { SearchContext } from '../hooks/SearchContext'
import {NomineeList} from '../components/NomineeList'

const useStyles = makeStyles((theme) => ({
  navContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor:theme.palette.primary.main,
    position:'fixed',
    width:'100%',
    boxShadow: '1px 5px 17px grey'
  },
  root: {
    border: '1px solid #e2e2e1',
    borderRadius: 4,
    backgroundColor: '#fbf7ed',
  },
  name: {
    marginTop: '18px',
    color:theme.palette.secondary.pale,
    fontWeight:'bold',
  },
  nomineeButton:{
    backgroundColor:theme.palette.secondary.pale,
    "&:hover": {
      backgroundColor: theme.palette.secondary.pale
  },
    color:'gray',
    marginRight:'10%',
    boxShadow: '1px 5px 17px grey'
  }

}))

const NavbarSearch = () => {
  const classes = useStyles()
  let searchTerm = useContext(SearchContext)
  const [search, setSearch] = useState('')
  const [nomineeInfo,openNomineeInfo] = useState(false)

  const submitSearch = (event) => {
    event.preventDefault()
    localStorage.setItem('searchTerm',search)
    searchTerm.setMovieKeyword(search)
  }

  function handleOpenNominees (){
    openNomineeInfo(true)
  }
  function handleCloseNominees(){
    openNomineeInfo(false)
  }
  return (
    <AppBar position="relative">
      <Toolbar className={classes.navContainer} >
        <Typography className={classes.name} component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          The Shoppies
      </Typography>
        <Button
         onClick = {handleOpenNominees}
         className = {classes.nomineeButton}>Nominees</Button>
          <Typography variant="h6" color="inherit" noWrap>
            <form onSubmit={(event) => { submitSearch(event) }}>
              <TextField className={classes.root} InputProps={{ disableUnderline: true }}
                id="standard-full-width"
                // style={{ margin: 8 }}
                placeholder="Title Keywords"
                fullWidth
                // margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setSearch(event.target.value)}
              />
            </form>
          </Typography>
      </Toolbar>
      <NomineeList open = {nomineeInfo} handleClose = {handleCloseNominees}/>
    </AppBar>
  )
}

export default NavbarSearch
