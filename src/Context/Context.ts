import React, { createContext, useState, type ReactNode } from "react";

// Create contextType
type AppContextType = {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
      searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

// creating context function and setting it's default to undefined
export const AppContext = createContext<AppContextType>({
  
  isSearchOpen:false,
  setIsSearchOpen:(isOpen)=>{!isOpen},

    isNavOpen: false,
  setIsNavOpen: (isOpen) => {!isOpen},

  searchValue:"",
  setSearchValue:(value)=>value

});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);//state to track if searxhbar is opened
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");//state to track search bar value

  return React.createElement(
    AppContext.Provider,
    { value: {   isSearchOpen,isNavOpen
, setIsSearchOpen,setIsNavOpen,searchValue,setSearchValue } },
    children
  );
};
