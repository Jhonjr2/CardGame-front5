import React, { useEffect, useState } from 'react';
import CardsPage from '../cards/CardSearch'
import ExChangeCard from './ExChangeCard';
import './styles/ExChangePage.css'
import Notifications from '../notification/Notifications';
import useFetch from '../../../hook/useFecth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ExChangePage = () => {

    const { dataSummary, dataInfo } = useFetch();
    
    return (
        <div className='exchangePage'>
            <h2 className='text_exchangePage'>Intercambios</h2>
            <div>
                {!dataSummary ? <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '2em', color: 'black', marginLeft: '30px' }} />:
                dataSummary?.exchanges && dataSummary.exchanges.map(e => (
                    <ExChangeCard
                        key={e.user_aws_id}
                        exChange={e}
                        dataInfo={dataInfo}
                    />
                ))}
            </div>
            <Notifications />
        </div>
    );
};

export default ExChangePage;
