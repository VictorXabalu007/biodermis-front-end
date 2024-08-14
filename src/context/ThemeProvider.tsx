import { createContext, useContext, useState } from "react";



type ContextProviderState = {
    title: string;
    setTitle:React.Dispatch<React.SetStateAction<string>>
}


const ThemeContext = createContext<ContextProviderState | undefined>(undefined);


export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const [title, setTitle] = useState("")
    
  
    return (
      <ThemeContext.Provider value={{ 
            title,
            setTitle
      }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  

  export const useStateTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
      throw new Error('useStateContext must be used within a ContextProvider');
    }
    return context;
  };