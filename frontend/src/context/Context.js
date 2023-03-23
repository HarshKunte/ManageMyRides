import { createContext, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [viewingTransaction, setViewingTransaction] = useState();

  return (
    <Context.Provider
      value={{
        transactions,
        setTransactions,
        viewingTransaction,
        setViewingTransaction,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context
