import React, { useEffect, useState } from 'react';
import CardsPage from '../cards/CardSearch'
import ExChangeCard from './ExChangeCard';
import './styles/ExChangePage.css'
import Notifications from '../notification/Notifications';
import useFetch from '../../../hook/useFecth';

const ExChangePage = () => {

    const { dataSummary, dataInfo } = useFetch();
    

    return (
        <div className='exchangePage'>
            <h2 className='text_exchangePage'>Intercambios</h2>
            <div>
                {dataSummary?.exchanges && dataSummary.exchanges.map(e => (
                    <ExChangeCard
                        key={e.id}
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
