import { Suspense, useEffect, useState } from 'react';
import './HomePage.css';
import "react-image-gallery/styles/css/image-gallery.css"
import { useTranslation } from 'react-i18next'
import ExChangePage from '../../components/exchange/ExChangePage';
import CardPage from '../../components/cards/CardPage';
import React from 'react';
import Slider from '../../components/slider/Slider';



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
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const hasShownModal = localStorage.getItem('hasShownModal');
        if (!hasShownModal) {
            console.log("Modal should show");
            setIsModalOpen(true);
            localStorage.setItem('hasShownModal', true);
        }
    }, []);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Suspense>
            <div className="logged-user-card">
            {isModalOpen && (
                    <div className="modal_overlay1" onClick={closeModal}>
                        <div className="modal_content1">
                            <Slider isModalOpen={isModalOpen}/>
                        </div>
                    </div>
                )}
                <div className='info_home'>
                    <CardPage />
                    <ExChangePage />
                </div>
            </div>
        </Suspense>
    )
}

export default HomePage;