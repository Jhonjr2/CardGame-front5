import { useState, useEffect } from "react";

const useFetch = () => {
    const baseUrl = 'https://fnlclp5rqe.execute-api.us-east-1.amazonaws.com/dev';

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


    useEffect(() => {
        const summary = async () => {
            try {
                const res = await fetch(`${baseUrl}/summary`);
                const datajson = await res.json();
                setDataSummary(datajson);

            } catch (error) {
                console.log(error);
            }
        };

        summary();

        const intervalId = setInterval(summary, 3600000);

        return () => clearInterval(intervalId);
    }, []);

    return {
        dataInfo,
        dataSummary,
        infoFilted
    };
};

export default useFetch;
