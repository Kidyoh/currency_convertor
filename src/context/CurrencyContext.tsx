import React, { createContext, useState, ReactNode } from 'react';

interface CurrencyContextType {
  from: string;
  setFrom: React.Dispatch<React.SetStateAction<string>>;
  to: string;
  setTo: React.Dispatch<React.SetStateAction<string>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
}

const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [from, setFrom] = useState("🇺🇸 USD - United States");
  const [to, setTo] = useState("🇪🇹 ETB - Ethiopia");
  const [input, setInput] = useState("");

  const value: CurrencyContextType = {
    from,
    setFrom,
    to,
    setTo,
    input,
    setInput,
  };

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
