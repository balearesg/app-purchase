import React from 'react';

export const PurchasedContext = React.createContext({} as any);
export const usePurchasedContext = () => React.useContext(PurchasedContext);
