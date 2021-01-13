import React, { useContext, useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { SearchContext } from '../hooks/SearchContext'
import { makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor:theme.palette.primary.main
  },
  root: {
    border: '1px solid #e2e2e1',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
  },
  name: {
    marginTop: '18px',
    color:'white'
  }

}))

const NavbarSearch = () => {
  const classes = useStyles()
  let searchTerm = useContext(SearchContext)
  const [search, setSearch] = useState('')
  const submitSearch = (event) => {
    event.preventDefault()
    localStorage.setItem('searchTerm',search)
    searchTerm.setMovieKeyword(search)
  }
  return (
    <AppBar position="relative">
      <Toolbar className={classes.navContainer} >
        <Typography className={classes.name} component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          YearOne Movie Rating
      </Typography>
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
    </AppBar>
  )
}

export default NavbarSearch
