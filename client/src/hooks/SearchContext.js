
import React, { createContext, useState } from "react";

export const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [movieKeyword, setMovieKeyword] = useState('')

  return (
    <SearchContext.Provider
      value={{
        movieKeyword,
        setMovieKeyword,
      }}>
      {children}
    </SearchContext.Provider>
  )
}
