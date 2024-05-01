import React, { useState } from 'react'
import CardSearch from '../CardSearch'
import './style/OfferingCardPage.css'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development'
import { useCardContext } from '../../../../reduxStore/CardContext'
import DetalleExchange from './DetalleExchange'
import ContainerSelectCards from '../ContainerSelectCards'

const OfferingCardPage = () => {


  const { 
    selectedCardsSearch, 
    setSelectedCardsSearch, 
    selectedCardsOffer, 
    setSelectedCardsOffer 
  } = useCardContext();

  const TextOfferingCard = 'Selecciona las tarjetas que quieres ofrecer'
  const textOffertap = 'Toca cualquier tarjeta que quieras ofrecer'
  const containerWidth2 = '90%'
  const mode = "offers";
  const textStartexchange1 = ' '
  const textStartexchange2 = 'Intercambio'
  const colorContainer3 = 'var(--Color-container3)'
  const textColor = 'white'

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };


  return (
    <div className='offeringCardPage'>
      <button className='btn_back' onClick={handleClick}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANJJREFUSEvl1EFqAkEQRuHPQwR0n4BnEEFPIWQteB1xLXgYBW/gwo17IYcIBVEamRmnOzMLcdY971X9XdUDPX+DnvneRzDEN9a5kbaJKOAHfGKFbY7kmSCFXzDBtStBCj9jlguPQuo6eIRP8ZNT+e1sleADx7/Mo/JieFUHAd9jjBPmpZVXdZDCS9JI/7knk0bUuyAqSCX/zr9uijqV1I1pZ5PUtMmd7ELOU1G0zc8EcU/RSezGF5bY5cxwG0HwRlhgkwNveotyObXn23ZQLHx9wS8QNSYZP6YqMAAAAABJRU5ErkJggg==" />
      </button>
      <CardSearch
        TextOfferingCard={TextOfferingCard}
        textOffertap={textOffertap}
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

export default OfferingCardPage