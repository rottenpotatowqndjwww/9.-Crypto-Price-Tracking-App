import React, {useContext, useEffect, useState} from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import {Link} from 'react-router-dom'

const Home = () => {
  const convertINRtoNPR = (inrAmount) => inrAmount * 1.6;
  const {allCoin, currency} = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input,setInput] = useState('');

  const inputHandler = (event)=>{
    setInput(event.target.value);
    if(event.target.value === ""){
      setDisplayCoin(allCoin)
    }
  }
  const searchHandler = async(event)=>{
    event.preventDefault();
    const coins=  await allCoin.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLocaleLowerCase())
    })
    setDisplayCoin(coins);
  }
  useEffect(()=>{
    setDisplayCoin(allCoin);
  },[allCoin])

  return (
    <div className='home'>
      <div className="hero">
        <h1>Stay Ahead <br/>Of The Crypto Market</h1>
        <p>Track real-time cryptocurrency prices and market trends. Make informed decisions with our comprehensive crypto analytics platform.</p>
        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} value={input} type="text"  placeholder='Search For CryptoCurrency.....' required list='coinlist'/>
          <button type='submit'>Search</button>
          <datalist id='coinlist'>
            {allCoin.map((item,index)=>(
              <option key={index} value={item.name} />
            ))}
          </datalist>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:'center'}}>Changes in 24 Hours</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {displayCoin.slice(0,20).map((item,index)=>(
          <Link to={`/coin/${item.id}`} className='table-layout' key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt={item.name} />
              <p>{item.name} - {item.symbol.toUpperCase()}</p>
            </div>
            <p>
              {currency.symbol === "NRs"
                ? `NPR ${convertINRtoNPR(item.current_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : `${currency.symbol} ${item.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </p>
            <p className={item.price_change_percentage_24h > 0 ? 'positive-change' : 'negative-change'}>
              {Math.floor(item.price_change_percentage_24h*100)/100}%
            </p>
            <p className='market-cap'>
              {currency.symbol === "NRs"
                ? `NPR ${convertINRtoNPR(item.market_cap).toLocaleString()}`
                : `${currency.symbol} ${item.market_cap.toLocaleString()}`}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home