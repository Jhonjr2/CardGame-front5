import React from 'react'
import './notification.css'
import useFetch from '../../../hook/useFecth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Notifications = () => {

    const { dataInfo, dataNotification } = useFetch();


    const timeExchange = new Date('2024-04-21 15:01:06');
    const fechaActual = new Date();
    const diferencia = fechaActual - timeExchange;
    const diferenciaEnDias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    const formatoDiferencia = (diferenciaEnDias) => {
        if (diferenciaEnDias === 1) {
            return "hace 1 día";
        } else if (diferenciaEnDias < 7) {
            return `hace ${diferenciaEnDias} días`;
        } else {
            const semanas = Math.floor(diferenciaEnDias / 7);
            const diasRestantes = diferenciaEnDias % 7;
            if (diasRestantes === 0) {
                return `hace ${semanas} semanas`;
            } else {
                return `hace ${semanas} semanas y ${diasRestantes} días`;
            }
        }
    };


    const notifications = dataNotification?.notifications || [];
    const spaceText = ' '

    console.log(dataNotification)

    return (
        <div className='container_notifications'>
            <h2 className='title_notifications'>Notificaciones</h2>
            <ul>
                {!notifications ? <FontAwesomeIcon icon={faSpinner} spin 
                style={{ fontSize: '2em', color: 'black', marginLeft: '30px' }} />:

                notifications.map((notification, index) => (
                    <li className='info_notifications' key={index}>
                        <div>
                            <h2 className='text_notifications' >
                                {notification?.first_name} tiene la carta {spaceText}
                                {notification?.cards
                                    .filter(card => card.isOffering)
                                    .map((card, cardIndex) => {
                                        const matchingCard = dataInfo.cards.find(c => c.id === card.id);
                                        return matchingCard ? matchingCard.name : null;
                                    })
                                    .filter(name => name !== null) 
                                    .join(', ')} que estás buscando, Haciendo click aquí podrás ver más detalles sobre este intercambio.
                            </h2>
                            <h2 className='time_notifications'>Hace {formatoDiferencia(diferenciaEnDias)}</h2>
                        </div>
                        <img src="" alt="" />
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Notifications