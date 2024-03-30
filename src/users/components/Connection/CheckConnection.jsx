import React from 'react'
import { Detector } from 'react-detect-offline';
import './checkConnection.css'

const CheckConnection = (props) => {
    return (
        <div>
            <Detector
                render={({ online }) => (
                    online ? props.children :
                        <div className='container_connection' style={{ paddingTop: '10px', textAlign: 'center' }}>
                            <h1 className='title1_connection' style={{ marginBottom: '5px' }}>No Connection ⚠️</h1>
                            <h4 className='title2_connection' style={{ margin: '0' }}>Please check your internent connection</h4>
                        </div>
                )}
            />
        </div>
    )
}

export default CheckConnection