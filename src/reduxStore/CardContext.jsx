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

  return (
    <CardContext.Provider value={{ selectedCardsSearch, setSelectedCardsSearch, selectedCardsOffer, setSelectedCardsOffer }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => useContext(CardContext);
