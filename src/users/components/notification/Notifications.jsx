import React from 'react'
import notifications from '../../../data/notification.json'
import './notification.css'

const Notifications = () => {

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
    return (
        <div className='container_notifications'>
            <h2 className='title_notifications'>Notificaciones</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li className='info_notifications' key={index}>
                        <div>
                            <h2 className='text_notifications' >{notification.sender_id} tiene la carta de messi, que estas buscando, haciendo click acá podrás ver mas detalles sobre este intercambio</h2>
                            <h2 className='time_notifications'>Hace {formatoDiferencia(diferenciaEnDias)}</h2>
                        </div>
                        <img src="" alt="" />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Notifications