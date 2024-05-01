import React, { useState } from 'react'
import CardSearch from '../CardSearch'
import './style/SearchCardPage.css'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development'
import { useCardContext } from '../../../../reduxStore/CardContext'
import DetalleExchange from './DetalleExchange'
import ContainerSelectCards from '../ContainerSelectCards'

const SearchCardPage = () => {

    // const [selectedCards, setSelectedCards] = useState([]);

    const textCard = 'Selecciona las cartas que estas buscando'
    const textSelectap = 'O toque para seleccionar'
    const containerWidth2 = '90%'
    const mode = "search";
    const textStartexchange1 = ' '
    const textStartexchange2 = 'Intercambio'
    const colorContainer3 = 'var(--Color-container3)'
    const textColor = 'white'

    const {
        selectedCardsSearch,
        setSelectedCardsSearch,
        selectedCardsOffer,
        setSelectedCardsOffer
    } = useCardContext();


    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };


    return (
        <div className='SearchCardPage'>
            <button className='btn_back' onClick={handleClick}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANJJREFUSEvl1EFqAkEQRuHPQwR0n4BnEEFPIWQteB1xLXgYBW/gwo17IYcIBVEamRmnOzMLcdY971X9XdUDPX+DnvneRzDEN9a5kbaJKOAHfGKFbY7kmSCFXzDBtStBCj9jlguPQuo6eIRP8ZNT+e1sleADx7/Mo/JieFUHAd9jjBPmpZVXdZDCS9JI/7knk0bUuyAqSCX/zr9uijqV1I1pZ5PUtMmd7ELOU1G0zc8EcU/RSezGF5bY5cxwG0HwRlhgkwNveotyObXn23ZQLHx9wS8QNSYZP6YqMAAAAABJRU5ErkJggg==" />
            </button>
            <CardSearch
                TextCard={textCard}
                TextSelectap={textSelectap}
                containerWidth2={containerWidth2}
                mode={mode}
                selectedCardsSearch={selectedCardsSearch}
                setSelectedCardsSearch={setSelectedCardsSearch}
                selectedCardsOffer={selectedCardsOffer}
                setSelectedCardsOffer={setSelectedCardsOffer}
            />
            <div className='DetalleExchange'>
                <ContainerSelectCards
                    textStartexchange1={textStartexchange1}
                    textStartexchange2={textStartexchange2}
                    colorContainer3={colorContainer3}
                    textColor={textColor}
                    redirectTo="/detalleExchange"
                />
            </div>
        </div>
    )
}

export default SearchCardPage