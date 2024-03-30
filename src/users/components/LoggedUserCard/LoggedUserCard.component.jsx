import axios from 'axios';
import { Suspense, useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import './LoggedUserCard.styles.css';
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import { useTranslation } from 'react-i18next'


const Welcome = () => {
    const { t, i18n } = useTranslation(["welcome"]);
    const [language, setLanguage] = useState("es");

    const changeLanguage = () => {
        const newLanguage = language === "es" ? "en" : "es";
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
    };

    return (
        <>
            <div className='text_btn'>
                <p>{t('title', { name: "Jhon" })}</p>
            </div>
            <button className='btn_idioma' onClick={changeLanguage}>Cambiar Idioma</button>
        </>
    );
};


const LoggedUserCard = () => {

    const { user: loggedUser } = useSelector(state => state.auth);
    const [flag, setFlag] = useState("");


    useEffect(() => {
        const country = loggedUser?.country;
        axios.get(`https://restcountries.com/v3.1/name/${country}`)
            .then(res => setFlag(res.data[0].flags.svg))
    })

    const images = [
        {

            original: "https://images.unsplash.com/photo-1473976345543-9ffc928e648d?q=80&w=1559&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            original: "https://images.unsplash.com/photo-1473976345543-9ffc928e648d?q=80&w=1559&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            original: "https://images.unsplash.com/photo-1473976345543-9ffc928e648d?q=80&w=1559&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }

    ]

    return (
        <Suspense fallback="cargando traducciones">

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
            </div>
        </Suspense>


    )
}

export default LoggedUserCard;