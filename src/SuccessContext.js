// SuccessContext.js
import React, { createContext, useContext, useState } from 'react';

const SuccessContext = createContext();

export function SuccessProvider({ children }) {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <SuccessContext.Provider value={{ showSuccess, setShowSuccess }}>
      {children}
    </SuccessContext.Provider>
  );
}

export function useSuccess() {
  return useContext(SuccessContext);
}
