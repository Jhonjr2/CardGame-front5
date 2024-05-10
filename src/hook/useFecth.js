import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = () => {
    const baseUrl = '/dev';

    //Endpoint Info

    const [dataInfo, setDataInfo] = useState();
    const [infoFilted, setInfoFilted] = useState([]);
    const [dataSummary, setDataSummary] = useState(null);
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



    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = token ? { token: `${token}` } : {};

        const summary = async () => {
            try {
                const options = {
                    method: 'GET',
                    url: `${baseUrl}/exchanges`,
                    headers,
                };

                const res = await axios.request(options);
                setDataSummary(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        
            summary();
        
    }, []);

    


    return {
        dataInfo,
        dataSummary,
        infoFilted
    };

};

export default useFetch;
