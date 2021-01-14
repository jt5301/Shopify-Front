import React from 'react';
import NavbarSearch from './NavbarSearch.js'
import MovieDisplay from './MovieDisplay.js'
import { SearchProvider } from '../hooks/SearchContext.js'
import {NomineeProvider} from '../hooks/NomineeContext.js'


export default function Landing() {


  return (
    <React.Fragment>
      <SearchProvider>
        <NomineeProvider>
          <NavbarSearch />
          <MovieDisplay />
        </NomineeProvider>
      </SearchProvider>

    </React.Fragment>
  );
}
