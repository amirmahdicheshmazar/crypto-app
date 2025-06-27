import React from 'react';

import { useEffect,useState } from 'react';

// api function
import { getCoin } from '../services/api';

// component
import Loader from './Loader'
import Coin from './Coin';

// style
import styles from "./Landing.module.css"

const Landing = () => {

    const [coins,setCoin] = useState([])
    const [search,setSearch] = useState('')

    useEffect(() => {

        const fetchAPI = async () => {
            const data = await getCoin()
            setCoin(data)
        }

        fetchAPI()

    },[])

    const searchHandeler = event => {
        setSearch(event.target.value)
    }

    const searchedCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className={styles.main}>
            <input className={styles.input} type='text' placeholder='Search' value={search} onChange={searchHandeler} />
            {
                coins.length ? 
                    <div className={styles.coinContainer}>
                        {
                            searchedCoins.map(coin => <Coin key={coin.id} data={coin} />)
                        }
                    </div> :
                    <Loader/>
            }
        </div>
    );
};

export default Landing;