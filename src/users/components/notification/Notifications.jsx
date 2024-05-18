import React, { useEffect, useState } from 'react';
import './notification.css';
import useFetch from '../../../hook/useFecth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Avatar from '../avatar/Avatar';

const Notifications = ({ isOpenNotification, closeNotification, newNotificationCount }) => {
    const { dataInfo, dataNotification } = useFetch();
    const [formattedNotifications, setFormattedNotifications] = useState([]);

    useEffect(() => {
        if (isOpenNotification) {
            const formattedNotifications = formatNotifications();
            setFormattedNotifications(formattedNotifications);
        }
    }, [isOpenNotification, dataNotification]);

    const formatNotifications = () => {
        const notifications = dataNotification?.notifications || [];

        const formattedNotifications = notifications.map(notification => {
            const fechaNotificacion = new Date(notification.datetime);
            const fechaActual = new Date();
            const diferenciaEnMinutos = Math.floor((fechaActual - fechaNotificacion) / (1000 * 60));
            const diferenciaFormateada = formatoDiferencia(diferenciaEnMinutos);

            return {
                ...notification,
                diferenciaFormateada
            };
        });

        return formattedNotifications;
    };

    const formatoDiferencia = (diferenciaEnMinutos) => {
        if (diferenciaEnMinutos < 1) {
            return "hace un momento";
        } else if (diferenciaEnMinutos < 60) {
            return `hace ${diferenciaEnMinutos} ${diferenciaEnMinutos === 1 ? 'minuto' : 'minutos'}`;
        } else if (diferenciaEnMinutos < 1440) { // 1440 minutos = 24 horas (1 día)
            const horas = Math.floor(diferenciaEnMinutos / 60);
            return `hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
        } else if (diferenciaEnMinutos < 43200) { // 43200 minutos = 30 días (1 mes)
            const dias = Math.floor(diferenciaEnMinutos / 1440);
            return `hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
        } else {
            const meses = Math.floor(diferenciaEnMinutos / 43200);
            return `hace ${meses} ${meses === 1 ? 'mes' : 'meses'}`;
        }
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const width = '77px'
    const height = '50px'
    const fontSize = '20px'


    return (
        <>
            {isOpenNotification &&
                <div className='container_notifications' onClick={closeNotification}>
                    <div className='modal_notification' onClick={stopPropagation}>
                        <h2 className='title_notifications'>Notificaciones</h2>
                        <ul className='All_notification'>
                            {dataNotification === 'No hay notificaciones' ? <div className='textNot_notification'>{dataNotification}</div> :
                                !formattedNotifications.length ?
                                    <FontAwesomeIcon icon={faSpinner} spin className='IconNotification' /> :
                                    formattedNotifications.map((notification, index) => (
                                        <li className='info_notifications' key={index}>
                                            <Avatar
                                                firstName={notification.first_name}
                                                lastName={notification.last_name}
                                                width={width}
                                                height={height}
                                                fontSize={fontSize}
                                            />
                                            <div>
                                                <h2 className='text_notifications'>
                                                    {notification.first_name} tiene la carta {' '}
                                                    {notification.cards
                                                        .filter(card => card.isOffering)
                                                        .map((card, cardIndex) => {
                                                            const matchingCard = dataInfo.cards.find(c => c.id === card.id);
                                                            return matchingCard ? matchingCard.name : null;
                                                        })
                                                        .filter(name => name !== null)
                                                        .join(', ')} que estás buscando.
                                                </h2>
                                                <h2 className='time_notifications'>Hace {notification.diferenciaFormateada}</h2>
                                            </div>
                                            <img src="" alt="" />
                                        </li>
                                    ))
                            }
                        </ul>
                    </div>
                </div>
            }
            {!!newNotificationCount && <span className="notification-count">{newNotificationCount}</span>}

        </>
    );
};

export default Notifications;
