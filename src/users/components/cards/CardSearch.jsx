import React, { useEffect, useState } from 'react';
import './styles/CardSearch.css';
import ContainerCard from './ContainerCard';
import useFetch from '../../../hook/useFecth';

const CardSearch = ({ TextCard,
    TextCardHome,
    TextOfferingCard,
    TextopCards,
    TextSelectap,
    textOffertap,
    containerWidth1,
    containerWidth2,
    mode,
    selectedCardsSearch,
    setSelectedCardsSearch,
    selectedCardsOffer,
    setSelectedCardsOffer
   
}) => {
    const { dataInfo, infoFilted } = useFetch();
    const [searchCard, setSearchCard] = useState('');
    const [cardFilter, setCardFilter] = useState([]);

    useEffect(() => {
        localStorage.setItem('selectedCardsSearch', JSON.stringify(selectedCardsSearch));
    }, [selectedCardsSearch]);

    useEffect(() => {
        localStorage.setItem('selectedCardsOffer', JSON.stringify(selectedCardsOffer));
    }, [selectedCardsOffer]);
    

    useEffect(() => {
        setCardFilter(infoFilted);
    }, [infoFilted]);

    const cardsWithProperties = dataInfo?.cards.map(card => {
        return { ...card, isRequesting: false, isOffering: false };
    });
    
    // console.log(cardsWithProperties);
    

    const handleCardsfilter = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchCard(term);

        const filteredResults = dataInfo.cards.filter((card) =>
            card.name.toLowerCase().includes(term) ||
            dataInfo.countries.find((country) =>
                country.id === card.country_id && country.name.toLowerCase().includes(term)
            )
        );

        setCardFilter(filteredResults);
    };
    const handleCardSelection = (card) => {
        if (mode === "search" || mode === 'home') {
            const indexInSearch = selectedCardsSearch.findIndex((c) => c.id === card.id);
            if (indexInSearch === -1) {
                // La carta no está seleccionada en la lista de búsqueda, agregarla
                setSelectedCardsSearch([...selectedCardsSearch, { ...card, isRequesting: true, isOffering: false }]);
            } else {
                // La carta ya está seleccionada en la lista de búsqueda, cambiar su estado
                const updatedSelectedCardsSearch = [...selectedCardsSearch];
                updatedSelectedCardsSearch[indexInSearch].isRequesting = !updatedSelectedCardsSearch[indexInSearch].isRequesting;
                setSelectedCardsSearch(updatedSelectedCardsSearch);
            }
    
            // Verificar si la carta también está presente en selectedCardsOffer
            const indexInOffer = selectedCardsOffer.findIndex((c) => c.id === card.id);
            if (indexInOffer !== -1) {
                // La carta también está presente en selectedCardsOffer, eliminarla
                const updatedSelectedCardsOffer = selectedCardsOffer.filter((c) => c.id !== card.id);
                setSelectedCardsOffer(updatedSelectedCardsOffer);
            }
        } else if (mode === "offers") {
            const indexInOffer = selectedCardsOffer.findIndex((c) => c.id === card.id);
            if (indexInOffer === -1) {
                // La carta no está seleccionada en la lista de oferta, agregarla
                setSelectedCardsOffer([...selectedCardsOffer, { ...card, isRequesting: false, isOffering: true }]);
            } else {
                // La carta ya está seleccionada en la lista de oferta, cambiar su estado
                const updatedSelectedCardsOffer = [...selectedCardsOffer];
                updatedSelectedCardsOffer[indexInOffer].isOffering = !updatedSelectedCardsOffer[indexInOffer].isOffering;
                setSelectedCardsOffer(updatedSelectedCardsOffer);
            }
    
            // Verificar si la carta también está presente en selectedCardsSearch
            const indexInSearch = selectedCardsSearch.findIndex((c) => c.id === card.id);
            if (indexInSearch !== -1) {
                // La carta también está presente en selectedCardsSearch, eliminarla
                const updatedSelectedCardsSearch = selectedCardsSearch.filter((c) => c.id !== card.id);
                setSelectedCardsSearch(updatedSelectedCardsSearch);
            }
        }
    };
    
    
    
    
    
    const handleRemoveCard1 = (cardId) => {
        const updatedSelectedCards1 = selectedCardsSearch?.filter((card) => card.id !== cardId);
        setSelectedCardsSearch(updatedSelectedCards1);
    };
    const handleRemoveCard2 = (cardId) => {
        const updatedSelectedCards2 = selectedCardsOffer?.filter((card) => card.id !== cardId);
        setSelectedCardsOffer(updatedSelectedCards2)
    };

    return (
        <div className="CardSearch">
            <h2 className="text">{TextCard ? TextCard : (TextCardHome ? TextCardHome : TextOfferingCard)}</h2>
            <div>
                <input
                    className="search_cards"
                    type="text"
                    placeholder="Nombre jugador o país"
                    value={searchCard}
                    onChange={handleCardsfilter}
                />
                <img
                    className="searchIcon"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAbtJREFUSEvV1UuITnEYx/HPkJUMKYmd2dq4bS0kIxuXmoRSQkmR5JZZDKVoynWmJoqkRBaKjShZYCe3srOxsnArYmEWM/6P/m+deZvznqP3nYX/6jyn83++z/V3ukzx6Zpi/8oA83AYy7EkB/EaL3AeX+oGNhlgO4Yxu8TJN+zE/TqQZsB+DOWLdzGCJ9lenSLfh43Z3obbVZAioAfvMS2X51zJ5RPp/Un8wiJ8bgUpAiLavbiDLRWRPcRaDOBUXcBHLMhNfVsB6MUjvMSKuoBRzEgRTU+RjVUA5uIrfrQYhr8uiiX6iZmYlXoQz61ON77jE+bXzeAdFmMlnlcAVuXpeow1dQGncTz14B42VQCi/tGH2JmbdQEL8SH34QjOllwcxFHEZi/7lz2Ib3fgemHRLuFZtjdgD9Zl+0Lel5YDMZlUbE7jegVzSqKLybmcs4i+HcODskzKxC4m41AWu6WpN7/xCk9xLYtdCF9jB0K7DmC8GdSOXK9vEryLaXQPdhIQvm5ha8HpGfQXIe1kEH5i8wPSV3AaJdzdsNsFNPxcxa5sTMiiU4CQ+BvpX/EmSc0Eme8UoHTf/n/AH9BmShm5CxJHAAAAAElFTkSuQmCC"
                />
            </div>
            <h2 className="text_card">{TextopCards ? TextopCards : (TextSelectap ? TextSelectap : textOffertap)}</h2>
            <div className="card-scroll-container" style={{ width: containerWidth1 ? containerWidth1 : containerWidth2 }}>
                {cardFilter.map((item) => (
                    <ContainerCard
                        key={item.id}
                        card={item}
                        countries={dataInfo?.countries}
                        onClick={() => handleCardSelection(item)}
                    />
                ))}
            </div>
            <div className='ContainerSelect'>
                {mode === "search" ? 
                <>
                <p className='counterSelect'>Selected Cards: ({ selectedCardsSearch?.length})</p>
                <ul className='ContainerSelectCard'>
                    {selectedCardsSearch?.map((card) => (
                        <li key={card.id}>
                            <ContainerCard 
                             card={card} 
                             countries={dataInfo?.countries}
                             selectedCards={selectedCardsSearch}
                             onClickRemove={() => handleRemoveCard1(card.id)}
                             />
                        </li>
                    ))}
                </ul>
                </>:
              <>
                {mode === "offers"? 
                <>
                <p className='counterSelect'>Selected Cards: ({ selectedCardsOffer?.length})</p>
                <ul className='ContainerSelectCard'>
                    {selectedCardsOffer?.map((card) => (
                    <li key={card.id}>
                        <ContainerCard 
                          card={card} 
                          countries={dataInfo?.countries}
                          selectedCards={selectedCardsOffer}
                          onClickRemove={() => handleRemoveCard2(card.id)}
                        />
                    </li>
                    ))}
                </ul>
                </>:''
                }
             </>
                }
            </div>
        </div>
    );
};

export default CardSearch;


// ovirride suspend operator fun invoke(card: Card, cardOperation: CardOperation) {
//     when(cardsOperation) {
//         //pantalla/componente de solicitar esta activo
//         CardsOperation.REQUESTING -> {
//             if(!card.isRequesting){
//               //LA carta nunca ha sido solicitada, poner IS_REQUESTING en true
//               appDb.testAppDao().updateIsRequesting(card.id, isRequestingInt: 1)
//             }else {
//               //La carta ya ha sido solicitada, poner IS_REQUESTING en false
//              appDb.testAppDao().updateIsRequesting(card.id, isRequestingInt: o)
//             }
//          //la carta viene del componenten OFRECER?
//             if(card.isOffering){
//              // si la viene del componenten OFRECER, poner IS_REQUESTING en false
//              appDb.testAppDao().updateIsRequesting(card.id, isOfferingngInt: 0)
//             }
//         }

//         //pantalla/componente de OFRECER esta activo

//         CardsOperation.OFFERING -> {
//             if(!card.isOffering){
//               //LA carta nunca ha sido ofrecida, poner IS_REQUESTING en true
//               appDb.testAppDao().updateIsOffering(card.id, isOfferingInt: 1)
//             }else {
//               //La carta ya ha sido ofrecida, poner IS_REQUESTING en false
//              appDb.testAppDao().updateIsOffering(card.id, iisOfferingInt: 0)
//             }
//          //la carta viene del componenten Solicitar?
//             if(card.isOffering){
//              // si la viene del componenten Solicitar, poner IS_REQUESTING en false
//              appDb.testAppDao().updateIsRequesting(card.id, isRequestingInt: 0)
//             }
//         }

    
//     }
// }