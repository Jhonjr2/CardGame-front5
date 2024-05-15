import React from 'react'
import useFetch from '../../../hook/useFecth';
import { useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';
import './styles/DetailExchange.css'

const DetailExchange = () => {

    const { dataSummary, dataInfo } = useFetch();

    console.log(dataSummary)

    const location = useLocation();
    const { state } = location;
    const { exchange, cardNames } = state || {};

    return (
        <div className='DetailExchange'>
            <h1>{exchange?.first_name ? exchange?.first_name && exchange?.last_name: 'Alguien'} <span>esta buscando la carta de</span> {cardNames}</h1>
            {/* <div className="selected_cards">
            <h2>Cartas Buscadas</h2>
            <div className="searching_cards">
                {selectedCardsSearch?.map(card => (
                    <ContainerCard
                        key={card.id}
                        card={card}
                        selectedCards={selectedCardsSearch}
                        onClickRemove={() => handleRemoveCard1(card.id)}
                    />
                ))}
            </div>
            <h2>Cartas Ofrecidas</h2>
            <div className="offering_cards">
                {selectedCardsOffer?.map(card => (
                    <ContainerCard
                        key={card.id}
                        card={card}
                        selectedCards={selectedCardsOffer}
                        onClickRemove={() => handleRemoveCard2(card.id)}
                    />
                ))}
            </div>
            <button onClick={handleSubmitExchange}>Enviar Intercambio</button>
        </div> */}
        </div>
    )
}

export default DetailExchange