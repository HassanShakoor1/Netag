import React, { useState } from 'react';
import search from "../images/search.png";
import vector from "../images/vector.png";
import England from "../images/England.png";
import Spain from "../images/Spain.png";
import united from "../images/united.png";
import France from "../images/France.png";
import check from "../images/check.svg";
import { Link } from "react-router-dom";
import { ref as sRef, onValue, update } from "firebase/database";
import { useContext } from 'react';
import {AppContext} from "./LanguageContextProvider"

import { database as db } from "../firebase.jsx";
import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

function Language() {
    const{setLanguage}=useContext(AppContext)
 
     // for translation 
     const { t } = useTranslation()

    const [selectedLanguage, setSelectedLanguage] = useState(null); // Track the selected language ID or name


    const handleSelectLanguage = (language) => {
        setSelectedLanguage(language); // Set the currently selected language
        setLanguage(language)
    };

    // updating user from firebase 
    const update_data=async()=>{

        const dbref=sRef(db,`User/${localStorage.getItem("userId")}`)

        await update(dbref,{
            language:selectedLanguage
        })
    }

    useEffect(()=>{
        update_data()
    },[selectedLanguage])
    const languages = [
        { id: 'english', name: 'English (UK)', image: England },
        { id: 'Spain', name: 'Spain', image: Spain },
        { id: 'France', name: 'France', image: France },
        { id: 'Arabic', name: 'Arabic', image: united },
    ];

    return (
        <div className="categories-maindiv">
            <div className="categories-width">
                <div className="categories-maindiv1">
                    <div className="categories-width1">
                        {/* Top */}
                        <div style={{ display: "flex", justifyContent: "start" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                                <div>
                                    <Link to="/home/setting">
                                        <img src={vector} alt="Back" />
                                    </Link>
                                </div>
                                <div style={{ color: "#EE0000", fontWeight: "600", width: "68%" }}>
                                    {t("Choose language")}
                                </div>
                            </div>
                        </div>
                        {/* Input */}
                        <div style={{ backgroundColor: "#F3F3F3", border: "none", height: "10vh" }} className="categories-input">
                            <div style={{ width: "60%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <img src={search} alt="Search" />
                                </div>
                                <div style={{ color: "#616161", fontSize: "14px", width: "90%" }}>
                                    {t("Search Language")}
                                </div>
                            </div>
                        </div>

                        {/* Languages */}
                        {languages.map(language => (
                            <div style={{ display: "flex", justifyContent: "center" }} key={language.id}>
                                <div style={{ marginTop: "1rem", width: "100%" }}>
                                    <div style={{ border: "1px solid #EAEAEA", boxShadow: "none" }} className="settingcard">
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "15vh" }}>
                                            <div style={{ width: "90%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <img src={language.image} alt={language.name} />
                                                    <div style={{
                                                        background: 'linear-gradient(to right, #D80027 0%, #FFDA44 50%, #D80027 100%)',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        marginLeft: '6px',
                                                        fontSize: '16px',
                                                        display: 'inline-block'
                                                    }}>
                                                       {t( language.name)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <button
                                                        style={{
                                                            border: selectedLanguage === language.id ? "0.6px solid rgba(14, 214, 120, 1)" : "0.6px solid rgba(0, 0, 0, 1)",
                                                            paddingLeft: "13px",
                                                            paddingRight: "13px",
                                                            paddingTop: "5px",
                                                            paddingBottom: "5px",
                                                            borderRadius: "6px",
                                                            color: "#000000",
                                                            fontSize: "10px",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}
                                                        onClick={() => handleSelectLanguage(language.id)}
                                                    >
                                                        {selectedLanguage === language.id ? <><img src={check} alt="Selected" /> Selected</> : "Tap to Select"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Language;
