import { Suspense, useEffect, useState } from 'react';
import './HomePage.css';
import "react-image-gallery/styles/css/image-gallery.css"
import { useTranslation } from 'react-i18next'
import ExChangePage from '../exchange/ExChangePage';
import CardPage from '../cards/CardPage';
import React from 'react';




const Welcome = () => {
    const { t, i18n } = useTranslation(["welcome"]);
    const [language, setLanguage] = useState("en");

    const changeLanguage = () => {
        const newLanguage = language === "en" ? "es" : "en";
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
    };

    return (
        <div>
            <div className='text_btn'>
                <p>{t('Welcome to the Card games 🈳🌐')}</p>
                <button className='btn_idioma' onClick={changeLanguage}><i className="fa-solid fa-language"></i></button>
            </div>
        </div>
    );
};


const HomePage = () => {

    return (
        <Suspense>
            <div className="logged-user-card">
                {/* <Welcome /> */}
                <div className='info_home'>
                    <CardPage/>
                    <ExChangePage />
                </div>
                
            </div>
        </Suspense>
    )
}

export default HomePage;