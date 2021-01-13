import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    }
  },
  palette: {
    primary: {
      main: '#12395E',
      light:'#44638b',
      dark:'#001334'
   },
   secondary:{
      main:'#DF3B57'
   },
  }
});
