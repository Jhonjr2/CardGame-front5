import React from 'react'
import './styles/ContainerCard.css'

const ContainerCard = ({ card, countries, onClick, selectedCards, onClickRemove }) => {

  const country = countries?.find(e => e.id == card.country_id)

  return (
    <div className="container-card" onClick={onClick}>
      {selectedCards ?
        <button className='btn_remove' onClick={onClickRemove}>x</button>
        : ''
      }
      <div className='card_front'>
        <h1 className='card_name'>{card?.name}</h1>
        {country && <h3 className='card_country'>{country.name}</h3>}
        <div>
          <p className='card_stars'>⭐️{card?.stars}</p>
        </div>
      </div>
      {selectedCards ? '':
        <div className="card_back">
          <h2>SELECT😉</h2>
        </div>
       }
    </div>
  )
}

export default ContainerCard