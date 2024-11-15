

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import English from "../languages/english.json"
import Arabic from "../languages/arabic.json"
import Spain from "../languages/spain.json"
import France from "../languages/french.json"
import Somali  from "../languages/somali.json"
import Amharic from "../languages/amharic.json"
import Tigrinya from "../languages/Tigrinya.json"
import Afaan from "../languages/afaan.json"


i18next
.use(initReactI18next)
.init({
    resources:{
        English:{
            translation:English
        },
        Arabic:{
            translation:Arabic
        },
        Spain:{
            translation:Spain 
        },
        France:{
            translation:France
        },
        Somali:{
            translation:Somali
        },
        Amharic:{
            translation:Amharic
        },
        Tigrinya:{
            translation:Tigrinya
        },
        Afaan:{
            translation:Afaan
        }
    },
    lng: localStorage.getItem('lng') || 'English', // Default language
    
    fallbackLng:"english",
    interpolation:{
        escapeValue:false
    }


})
export default i18next