import React from 'react';
import NavbarSearch from './NavbarSearch.js'
import MovieDisplay from './MovieDisplay.js'
import { SearchProvider } from '../hooks/SearchContext.js'


export default function Landing() {


  return (
    <React.Fragment>
      <SearchProvider>
        <NavbarSearch />
        <MovieDisplay />
      </SearchProvider>

    </React.Fragment>
  );
}
