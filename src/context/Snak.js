import { createContext, useState } from "react";

export const SnakContext = createContext(null);

const SnakProvider = ({ children }) => {
  const [snak, setSnak] = useState({
    message: "",
    type: "",
    open: false,
  });

  const showSnak = ({ message, type }) => {
    setSnak({
      message: message,
      type: type,
      open: true,
    });
  };

  const closeSnak = () => {
    setSnak({
      ...snak,
      open: false,
    });
  };

  const value = { snak, showSnak, closeSnak };

  return <SnakContext.Provider value={value}>{children}</SnakContext.Provider>;
};

export default SnakProvider;
