import React, { createContext, useContext, useState, useEffect } from 'react';

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [selectedCardsSearch, setSelectedCardsSearch] = useState(() => {
    const storedCards = localStorage.getItem('selectedCardsSearch');
    return storedCards ? JSON.parse(storedCards) : [];
  });

  const [selectedCardsOffer, setSelectedCardsOffer] = useState(() => {
    const storedCards = localStorage.getItem('selectedCardsOffer');
    return storedCards ? JSON.parse(storedCards) : [];
  });

  useEffect(() => {
    localStorage.setItem('selectedCardsSearch', JSON.stringify(selectedCardsSearch));
  }, [selectedCardsSearch]);

  useEffect(() => {
    localStorage.setItem('selectedCardsOffer', JSON.stringify(selectedCardsOffer));
  }, [selectedCardsOffer]);

  const handleSubmitExchange = async () => {
    const exchangeData = {
      datetime: new Date().toISOString(),
      user_aws_id: 'user_aws_id', 
      offering_cards: selectedCardsOffer,
      requesting_cards: selectedCardsSearch
    };

    try {
      const response = await fetch('http://tuapi.com/user/send/exchange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(exchangeData)
      });
      
      if (response.ok) {
        console.log('Intercambio enviado exitosamente');
      } else {
        console.error('Error al enviar el intercambio');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <CardContext.Provider value={{ 
      selectedCardsSearch, 
      setSelectedCardsSearch, 
      selectedCardsOffer, 
      setSelectedCardsOffer, 
      handleSubmitExchange 
    }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => useContext(CardContext);
