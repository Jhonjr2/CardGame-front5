import React from 'react';
import ContainerCard from '../ContainerCard';
import { useCardContext } from '../../../../reduxStore/CardContext';
import './style/DetalleExchange.css'

const DetalleExchange = () => {

    const {
        setSelectedCardsSearch,
        setSelectedCardsOffer,
        selectedCardsSearch,
        selectedCardsOffer,
    } = useCardContext();

    const handleRemoveCard1 = (cardId) => {
        const updatedSelectedCards1 = selectedCardsSearch?.filter((card) => card.id !== cardId);
        setSelectedCardsSearch(updatedSelectedCards1);
    };
    const handleRemoveCard2 = (cardId) => {
        const updatedSelectedCards2 = selectedCardsOffer?.filter((card) => card.id !== cardId);
        setSelectedCardsOffer(updatedSelectedCards2)
    };

    return (
        <div className="selected_cards">
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
        </div>
    );
};

export default DetalleExchange;
