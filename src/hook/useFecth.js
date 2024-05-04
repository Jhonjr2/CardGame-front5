import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = () => {
    const baseUrl = '/dev';

    //Endpoint Info

    const [dataInfo, setDataInfo] = useState();
    const [infoFilted, setInfoFilted] = useState([]);
    const [dataSummary, setDataSummary] = useState();
    const [hasFetchedInfo, setHasFetchedInfo] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let dataFromLocal = localStorage.getItem('infoData');

                if (dataFromLocal) {
                    dataFromLocal = JSON.parse(dataFromLocal);
                    setDataInfo(dataFromLocal);
                    setInfoFilted(dataFromLocal.cards);
                } else {
                    const res = await fetch(`${baseUrl}/info`);
                    const datajson = await res.json();
                    setDataInfo(datajson);
                    setInfoFilted(datajson.cards);

                    localStorage.setItem('infoData', JSON.stringify(datajson));
                }

                setHasFetchedInfo(true);
            } catch (error) {
                console.log(error);
            }
        };

        if (!hasFetchedInfo) {
            fetchData();
        }
    }, [hasFetchedInfo]);


    //Endpoint Summary
    // const [tokenChanged, setTokenChanged] = useState(false);
    // const token = localStorage.getItem('token');

    useEffect(() => {
        // const fetchDataFromLocalStorage = () => {
        //     const summaryData = localStorage.getItem('dataSummary');
        //     if (summaryData) {
        //         const parsedData = JSON.parse(summaryData);
        //         setDataSummary(parsedData);
        //     }
        // };
    
        // fetchDataFromLocalStorage();
    
        const token = localStorage.getItem('token');
        const headers = token ? { token: `${token}` } : {};
    
        const summary = async () => {
            try {
                const options = {
                    method: 'GET',
                    url: `${baseUrl}/summary`,
                    headers,
                    timeout: 30000,
                };
    
                const res = await axios.request(options);
                setDataSummary(res.data);
                localStorage.setItem('dataSummary', JSON.stringify(res.data));
                localStorage.setItem('lastSummaryUpdate', Date.now());
            } catch (error) {
                console.log(error);
            }
        };
    
        const lastUpdate = localStorage.getItem('lastSummaryUpdate');
        if (!lastUpdate || Date.now() - lastUpdate > 3600000) {
            summary();
        }
    }, []);
    

    return {
        dataInfo,
        dataSummary,
        infoFilted
    };

};

export default useFetch;
