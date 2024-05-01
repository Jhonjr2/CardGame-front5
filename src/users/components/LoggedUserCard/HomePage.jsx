import { Suspense, useEffect, useState } from 'react';
import './HomePage.css';
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import { useTranslation } from 'react-i18next'
import ExChangePage from '../exchange/ExChangePage';
import CardPage from '../cards/CardPage';



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


    const images = [
        {

            original: "https://images.unsplash.com/photo-1473976345543-9ffc928e648d?q=80&w=1559&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {

            original: "https://images.unsplash.com/photo-1473976345543-9ffc928e648d?q=80&w=1559&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {

            original: "https://images.unsplash.com/photo-1473976345543-9ffc928e648d?q=80&w=1559&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ]

    return (
        <Suspense>
            <div className="logged-user-card">
                <div className="carousel-container">
                    <ImageGallery
                        items={images}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        autoPlay={true}
                    />
                </div>
                <Welcome />
                <div className='info_home'>
                    <CardPage/>
                    <ExChangePage />
                </div>
            </div>
        </Suspense>
    )
}

export default HomePage;