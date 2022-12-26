import React from "react";

const GlobalContext = React.createContext({
  rooms: [],
  setRooms: () => {},
});

export default GlobalContext;
