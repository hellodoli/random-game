import React, { useState } from "react";

export const GameContext = React.createContext({});

export const GameProvider = ({ children }) => {
  const [values] = useState([]);

  return (
    <GameContext.Provider
      value={{
        values
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
