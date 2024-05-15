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


    // Endpoint Exchange

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


    // endpoint notification

    const [dataNotification, setDataNotification] = useState(null)

    useEffect(() => {
      
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('aws_id');

        const notification = async() => {

    
            try {
                const options = {
                    method: 'GET',
                    url: `${baseUrl}/notifications?user_aws_id=${id}`,
                    headers: {
                        'token': token
                    }
                }
    
                const res = await axios.request(options)
                setDataNotification(res.data)
                console.log(res.data)
    
            } catch{
                console.log(error)
    
            }
    
        }
        notification();
        
    }, [])
    
   


    return {
        dataInfo,
        dataSummary,
        infoFilted,
        dataNotification
    };

};

export default useFetch;
