import React, { useEffect } from 'react';
import ContainerCard from '../ContainerCard';
import { useCardContext } from '../../../../reduxStore/CardContext';
import './style/DetalleExchange.css'
import useFetch from '../../../../hook/useFecth';

const DetalleExchange = () => {

    const {
        setSelectedCardsSearch,
        setSelectedCardsOffer,
        selectedCardsSearch,
        selectedCardsOffer,
        handleSubmitExchange,
        userExchange
    } = useCardContext();

    const { dataInfo } = useFetch();

    console.log(userExchange)


    const handleRemoveCard1 = (cardId) => {
        const updatedSelectedCards1 = selectedCardsSearch?.filter((card) => card.id !== cardId);
        setSelectedCardsSearch(updatedSelectedCards1);
    };
    const handleRemoveCard2 = (cardId) => {
        const updatedSelectedCards2 = selectedCardsOffer?.filter((card) => card.id !== cardId);
        setSelectedCardsOffer(updatedSelectedCards2)
    };

    const additionalCards = dataInfo?.cards;

    // Agregar las propiedades faltantes a las cartas en userExchange.cards
    // userExchange?.exchange?.cards?.forEach(card => {
    //     const additionalInfo = additionalCards?.find(infoCard => infoCard.id === card.id);
    //     if (additionalInfo) {
    //         card.country_id = additionalInfo.country_id;
    //         card.name = additionalInfo.name;
    //         card.stars = additionalInfo.stars;
    //     }
    // });



    // Función para agregar cartas al conjunto de cartas seleccionadas sin duplicados
    // const addUniqueCards = (cards) => {
    //     const newSelectedCards = [...selectedCardsSearch, ...selectedCardsOffer];
    //     cards.forEach(card => {
    //         const additionalCardInfo = dataInfo?.cards?.find(infoCard => infoCard.id === card.id);
    //         if (additionalCardInfo) {
    //             newSelectedCards.push({
    //                 id: card.id,
    //                 isRequesting: card.isRequesting,
    //                 isOffering: card.isOffering,
    //                 country_id: additionalCardInfo.country_id,
    //                 name: additionalCardInfo.name,
    //                 stars: additionalCardInfo.stars,
    //             });
    //         }
    //     });
    //     return newSelectedCards;
    // };

    // useEffect(() => {
    //     // Agregar las cartas del endpoint al conjunto de cartas seleccionadas
    //     if (userExchange.exchange && userExchange.exchange.cards) {
    //         const newSelectedCards = addUniqueCards(userExchange.exchange.cards);
    //         // Separar las cartas seleccionadas en buscadas y ofrecidas
    //         const newSelectedSearch = newSelectedCards.filter(card => card.isRequesting);
    //         const newSelectedOffer = newSelectedCards.filter(card => card.isOffering);
    //         // Actualizar el estado de las cartas seleccionadas
    //         setSelectedCardsSearch(newSelectedSearch);
    //         setSelectedCardsOffer(newSelectedOffer);
    //     }
    // }, []);


    return (
        <div className="selected_cards">
            <h2>Cartas Buscadas</h2>
            <div className="searching_cards">
                {selectedCardsSearch?.map(card => (
                    <ContainerCard
                        key={card.id}
                        card={card}
                        countries={dataInfo?.countries}
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
                        countries={dataInfo?.countries}
                        selectedCards={selectedCardsOffer}
                        onClickRemove={() => handleRemoveCard2(card.id)}
                    />
                ))}
            </div>
            <button onClick={handleSubmitExchange}>Enviar Intercambio</button>
        </div>
    );
};

export default DetalleExchange;
