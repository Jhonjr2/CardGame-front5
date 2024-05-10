import React, { useEffect, useState } from 'react'
import './styles/cardExchange.css'
import ContainerCard from '../cards/ContainerCard'
import img from '../img/reactivar_icon.png'

const ExChangeCard = ({ exChange, dataInfo }) => {

  const [exChangeStatus, setExchangeStatus] = useState(exChange.is_available);


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
  return (
    <div className='CardExchange'>
      <div className='info'>
        {
          exChangeStatus == true ? (
            <div className='info_CardExchange'>
              <div>
                <h2 className={`text_CardExchange ${exChangeStatus == true ? 'habilitado' : 'inhabilitado'}`}>{exChange.first_name ? exChange.first_name && exChange.last_name: 'Alguien'} <span>esta buscando la carta de</span> {cardNames}</h2>
                <h2 className={`time_CardExchange ${exChangeStatus == true ? 'habilitado' : 'inhabilitado'}`}> {diferenciaFormateada} </h2>
              </div>
              <div className='containerCard'>
              </div>
            </div>
          ) :
            <div className='info_CardExchange'>
              <div>
                <h2 className={`text_CardExchange ${exChangeStatus ? 'habilitado' : 'inhabilitado'}`}>{exChange.first_name ? exChange.first_name && exChange.last_name: 'Alguien'} esta buscando la carta de <span>{cardNames}</span> </h2>
                <h2 className={`time_CardExchange ${exChangeStatus ? 'habilitado' : 'inhabilitado'}`}> {diferenciaFormateada} </h2>
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