import React, { createContext, useState } from 'react';

export const PurchaseHistoryContext = createContext();

export const PurchaseHistoryProvider = ({ children }) => {
    const [history, setHistory] = useState([]);

    const addTransaction = (transaction) => {
        setHistory((prevHistory) => [...prevHistory, transaction]);
    };

    return (
        <PurchaseHistoryContext.Provider value={{ history, addTransaction }}>
            {children}
        </PurchaseHistoryContext.Provider>
    );
};
