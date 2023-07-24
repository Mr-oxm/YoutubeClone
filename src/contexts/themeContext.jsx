/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";


// create sign in context
const ThemeContext = createContext();

// the context accessor
export const useThemeContext = () => {
  return useContext(ThemeContext);
};

// the context provider
export const ThemeContextProvider = ({ children }) => {
  // the main states
  const [theme, setTheme] = useState("youtubeDark");
  const [closeSidebar, setCloseSidebar] = useState(false);
  const [hasSiderbar, setHasSiderbar] = useState(true);

  
  return (
    <ThemeContext.Provider
      value={{
        theme:theme,
        closeSidebar: closeSidebar,
        hasSiderbar:hasSiderbar,
        setTheme,
        setCloseSidebar,
        setHasSiderbar,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
