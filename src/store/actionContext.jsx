import { createContext, useState, useContext } from "react";

const ActionContext = createContext();

export const ActionContextProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <ActionContext.Provider
      value={{
        showLogin,
        setShowLogin,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};

export const useAction = () => useContext(ActionContext);
