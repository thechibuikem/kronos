import React, { createContext, useState, type ReactNode } from "react";

// Create contextType
type AppContextType = {
  // managing opening and closing of search var 

  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
// managing opening and closing of nav bar

  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
// tracking value of search field

  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
// tracking backend auth's response

  authErrorMsg: string;
  setAuthErrorMsg: (msg:string)=>void;
};

// creating context function and setting it's default to undefined
export const AppContext = createContext<AppContextType>({
  // managing opening and closing of search var 
  isSearchOpen:false,
  setIsSearchOpen:(isOpen)=>{!isOpen},
// managing opening and closing of nav bar
    isNavOpen: false,
  setIsNavOpen: (isOpen) => {!isOpen},
// tracking value of search field
  searchValue:"",
  setSearchValue:(value)=>value,
// tracking backend auth's response
  authErrorMsg:"",
    setAuthErrorMsg: (value)=>value
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);//state to track if searxhbar is opened
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");//state to track search bar value
  const [authErrorMsg,setAuthErrorMsg] =useState("")

  return React.createElement(
    AppContext.Provider,
    { value: {   isSearchOpen,isNavOpen
, setIsSearchOpen,setIsNavOpen,searchValue,setSearchValue ,authErrorMsg,setAuthErrorMsg} },
    children
  );
};
