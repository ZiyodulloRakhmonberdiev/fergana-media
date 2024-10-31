// LanguageSelector.js
import React, { useState } from 'react';

const LanguageSelector = ({ t }) => {
    const [activeDropdown, setActiveDropdown] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("uz-latn");

    const languages = [
        { code: "uz-latn", label: "O'zbek", flag: "/images/uz.svg" },
        { code: "uz-cyrl", label: "Ўзбек", flag: "/images/uz.svg" },
        { code: "en", label: "English", flag: "/images/uk.svg" },
        { code: "ru", label: "Русский", flag: "/images/ru.svg" },
    ];

    const toggleDropdown = () => {
        setActiveDropdown(!activeDropdown);
    };

    const changeLanguage = (lang) => {
        setSelectedLanguage(lang);
        setActiveDropdown(false);
        console.log(`Language changed to: ${lang}`); // Tizimga chiqarish (test uchun)
    };

    const selectedLangData = languages.find(lang => lang.code === selectedLanguage);

    return (
        <div onClick={toggleDropdown} className="language-selector">
            <span className="dropdown-toggle">
                <img src={selectedLangData.flag} alt={selectedLangData.label} className="selected-flag" />
                {selectedLangData.label}
            </span>
            <i className="fa-solid fa-chevron-down"></i>
            <div className={`dropdown-menu ${activeDropdown ? "active" : ""}`}>
                {languages.map(({ code, label, flag }) => (
                    <div key={code} onClick={() => changeLanguage(code)} className="dropdown-item">
                        <span>{label}</span>
                        <img src={flag} alt={label} className="flag-icon" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LanguageSelector;