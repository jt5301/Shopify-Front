
import React, { createContext, useState } from "react";

export const NomineeContext = createContext()

export const NomineeProvider = ({ children }) => {
  const [nominees,setNominees] = useState({})

  return (
    <NomineeContext.Provider
      value={{
        nominees,
        setNominees,
      }}>
      {children}
    </NomineeContext.Provider>
  )
}
