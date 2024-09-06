
// import { createContext ,useState} from "react";
// import i18n from './i18n.js'

//   const AppContext=createContext()

//  const AppProvider=({children})=>{
//     const [language, setLanguage] = useState(i18n.language)

//     return(
//         <LanguageContext.Provider value={{language, setLanguage}}>
//             {children}
//         </LanguageContext.Provider>
//     )
// }
// export default {AppContext,AppProvider}


// LanguageContextProvider.js
import { createContext, useState } from "react";
import i18n from './i18n.js';

// Create the context
const AppContext = createContext();

// Create the provider component
const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language);
  
  const changeLanguage = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };

  return (
    <AppContext.Provider value={{ language, setLanguage:changeLanguage }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider }; // Named exports
