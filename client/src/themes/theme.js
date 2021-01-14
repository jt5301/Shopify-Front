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
      main: '#96bf48',
      light:'#C0D891',
      dark:'#5A722B'
   },
   secondary:{
      main:'#DF3B57',
      pale:'#fbf7ed'
   },
  }
});
