import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const baseUrl = '/dev';


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

  // send exchange

  const handleSubmitExchange = async () => {

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);
    const seconds = ('0' + currentDate.getSeconds()).slice(-2);

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const user_aws_id = localStorage.getItem('aws_id');
    const offering_cards = localStorage.getItem("selectedCardsOffer");
    const requesting_cards = localStorage.getItem("selectedCardsSearch");
    const offeringCardsArray = JSON.parse(offering_cards);
    const requestingCardsArray = JSON.parse(requesting_cards);
    const token = localStorage.getItem('token');

    try {
      const requestData = {
        headers: {
          token
        },
        body: {
          datetime: formattedDate,
          user_aws_id,
          offering_cards: offeringCardsArray,
          requesting_cards: requestingCardsArray
        }
      };

      const options = {
        method: 'POST',
        url: 'https://fnlclp5rqe.execute-api.us-east-1.amazonaws.com/dev/user/send/exchange',
        data: requestData

      };
      const res = await axios.request(options);
      console.log(res.data);

    } catch (error) {
      console.log(error);
    }

  };

  // Endpoint User

  const [userExchange, setUserExchange] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('aws_id');

    const user = async () => {
      try {
        const options = {
          method: 'GET',
          url: `${baseUrl}/user?id=${id}`,
          headers: {
            'token': token
          }

        };
        const res = await axios.request(options);
        setUserExchange(res.data)

      } catch (error) {
        console.log(error);
      }
    }

    user();
  }, []);



  return (
    <CardContext.Provider value={{
      selectedCardsSearch,
      setSelectedCardsSearch,
      selectedCardsOffer,
      setSelectedCardsOffer,
      handleSubmitExchange,
      userExchange

    }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => useContext(CardContext);
