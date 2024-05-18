import React, { useEffect, useState } from 'react'
import './styles/cardExchange.css'
import img from '../img/reactivar_icon.png'
import { useNavigate } from 'react-router-dom'
import Avatar from '../avatar/Avatar'

const ExChangeCard = ({ exChange, dataInfo }) => {

  const [exChangeStatus, setExchangeStatus] = useState(exChange.is_available);
  const navigate = useNavigate()

  const toggleExchangeStatus = () => {
    setExchangeStatus(!exChangeStatus);
  };

  const country = dataInfo?.countries.find(e => e.id === exChange.country_id)
  const cardIds = exChange?.cards.map(e => e.id);
  const cardsInExchange = dataInfo?.cards.filter(card => cardIds.includes(card.id));
  const cardNames = cardsInExchange?.map(card => card.name).join(', ');

  const timeExchange = new Date(exChange.datetime);
  const fechaActual = new Date();
  const diferencia = fechaActual - timeExchange;
  const diferenciaEnMinutos = Math.floor(diferencia / (1000 * 60));
  const diferenciaEnHoras = Math.floor(diferencia / (1000 * 60 * 60));
  const diferenciaEnDias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const diferenciaEnMeses = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 30.4375));

  const formatoDiferencia = (diferenciaEnMinutos) => {
    if (diferenciaEnMinutos < 1) {
      return "hace un momento";
    } else if (diferenciaEnMinutos < 60) {
      return `hace ${diferenciaEnMinutos} ${diferenciaEnMinutos === 1 ? 'minuto' : 'minutos'}`;
    } else if (diferenciaEnHoras < 24) {
      return `hace ${diferenciaEnHoras} ${diferenciaEnHoras === 1 ? 'hora' : 'horas'}`;
    } else if (diferenciaEnDias < 30) {
      return `hace ${diferenciaEnDias} ${diferenciaEnDias === 1 ? 'día' : 'días'}`;
    } else {
      return `hace ${diferenciaEnMeses} ${diferenciaEnMeses === 1 ? 'mes' : 'meses'}`;
    }
  };

  const diferenciaFormateada = formatoDiferencia(diferenciaEnMinutos);



  const navigateToExchangeDetail = () => {
    navigate('/detailExchange', { state: { exchange: exChange, cardNames: cardNames } });
  };

  let firstThreeCards = '';
  if (cardNames && cardNames.length > 0) {
    const cardsArray = cardNames.split(', ');
    const firstThree = cardsArray.slice(0, 3);
    firstThreeCards = firstThree.join(', ');
    if (cardsArray.length > 3) {
      firstThreeCards += `, y otras ${cardsArray.length - 3}`;
    }
  }

  const width = '65px'
  const height = '65px'
  const fontSize = '22px'

  return (
    <div className='CardExchange' onClick={navigateToExchangeDetail}>
      <div className='info'>
        {
          exChangeStatus == true ? (
            <div className='info_CardExchange'>
              <Avatar
                firstName={exChange.first_name ? exChange.first_name: 'N'}
                lastName={exChange.last_name ? exChange.last_name: 'N'}
                width={width}
                height={height}
                fontSize={fontSize}
              />
              <div>
                <h2 className={`text_CardExchange ${exChangeStatus == true ? 'habilitado' : 'inhabilitado'}`}>
                  {exChange.first_name ? (exChange.first_name || exChange.last_name) : 'Alguien'} <span>esta buscando la carta de</span> {firstThreeCards}
                </h2>
                <h2 className={`time_CardExchange ${exChangeStatus == true ? 'habilitado' : 'inhabilitado'}`}>
                  {diferenciaFormateada}
                </h2>
              </div>
              <div className='containerCard'>
              </div>
            </div>
          ) :
            <div className='info_CardExchange'>
              <div>
                <h2 className={`text_CardExchange ${exChangeStatus ? 'habilitado' : 'inhabilitado'}`}>
                  {exChange.first_name ? exChange.first_name || exChange.last_name : 'Alguien'} esta buscando la carta de <span>{firstThreeCards}</span>
                </h2>
                <h2 className={`time_CardExchange ${exChangeStatus ? 'habilitado' : 'inhabilitado'}`}>
                  {diferenciaFormateada}
                </h2>
              </div>
              <div>
                <img className='icon_reactive' src={img} alt="icon" onClick={toggleExchangeStatus} />
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default ExChangeCard