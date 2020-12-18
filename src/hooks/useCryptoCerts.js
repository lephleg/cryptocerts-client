import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import { abi as CryptoCertsAbi } from '../contracts/CryptoCerts.json';
import { CRYPTOCERTS_CONTRACT_ADDRESS } from '../config';

export const useCryptoCerts = function () {
    const web3Capable = useSelector((state) => state.connection.web3Capable);

    const [web3, setWeb3] = useState(null);
    const [cryptoCerts, setCryptoCerts] = useState(null);

    useEffect(() => {
        if (web3Capable) {
            let web3 = new Web3(window.ethereum);
            setWeb3(web3);
            setCryptoCerts(new web3.eth.Contract(CryptoCertsAbi, CRYPTOCERTS_CONTRACT_ADDRESS));
        }

        return () => {
            setWeb3(null);
            setCryptoCerts(null);
        };
    }, [web3Capable]);


    return { web3, cryptoCerts };
}