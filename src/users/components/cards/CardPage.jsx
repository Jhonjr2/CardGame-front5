import React, { useState } from 'react'
import CardSearch from './CardSearch'
import image from '../../../assets/card.png'
import './styles/CardPage.css'
import ContainerSelectCards from './ContainerSelectCards'
import { useCardContext } from '../../../reduxStore/CardContext'

const CardPage = () => {

  const textCardHome = '¿Qué cartas estás buscando hoy?'
  const textSearchSelect = 'Estas buscando'
  const textofferingSelect = 'Estas ofreciendo'
  const textStartexchange1 = ' '
  const textStartexchange2 = 'Intercambio'
  const textopCards = 'Top 50 cards'
  const containerWidth1 = '42%'
  const mode = "home";
  const colorContainer1 = 'var(--Color-container1)'
  const colorContainer2 = 'var(--Color-container2)'
  const colorContainer3 = 'var(--Color-container3)'
  const textColor = 'white'

  const { 
    selectedCardsSearch, 
    setSelectedCardsSearch, 
    selectedCardsOffer, 
    setSelectedCardsOffer 
  } = useCardContext();

  
  return (
    <div>
      <div className='section_card'>
        <div className='info_card'>
          <h1 className='title_cardPage'>Encuentra todas la cartas que estás buscando!</h1>
          <CardSearch
            containerWidth1={containerWidth1}
            TextCardHome={textCardHome}
            TextopCards={textopCards}
            mode={mode}
            selectedCardsSearch={selectedCardsSearch}
            setSelectedCardsSearch={setSelectedCardsSearch}
            selectedCardsOffer={selectedCardsOffer}
            setSelectedCardsOffer={setSelectedCardsOffer}
          />
        </div>
        <div >
          <img className='img_card' src={image} alt="img_card" />
        </div>
      </div>
      <div className='ContainerSelectCards'>
        <ContainerSelectCards
          textSearchSelect={textSearchSelect}
          redirectTo="/searchCard"
          selectedCardsSearch={selectedCardsSearch}
          colorContainer1={colorContainer1}
        />
        <ContainerSelectCards
          textofferingSlect={textofferingSelect}
          redirectTo="/offeringCard"
          selectedCardsOffer={selectedCardsOffer}
          colorContainer2={colorContainer2}
        />
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

export default CardPage