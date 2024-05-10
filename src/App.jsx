import CheckConnection from './users/components/Connection/CheckConnection'
import './App.css'
import Navbar from './users/components/NavBar/NavBar.component'
import { Route, Routes } from 'react-router-dom'
import Login from './auth/pages/Login'
import OfferingCardPage from './users/components/cards/page/OfferingCardPage'
import SearchCardPage from './users/components/cards/page/SearchCardPage'
import DetalleExchange from './users/components/cards/page/DetalleExchange'
import HomePage from './users/page/Home/HomePage'
import { CardProvider } from './reduxStore/CardContext'
import React from 'react';


const App = () => {

    return (
        <div className='app'>
            <CardProvider>
                <Navbar />
                <CheckConnection />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/offeringCard' element={<OfferingCardPage />} />
                    <Route path='/searchCard' element={<SearchCardPage />} />
                    <Route path='/detalleExchange' element={<DetalleExchange />} />
                </Routes>
            </CardProvider>
        </div>
    )
}

export default App