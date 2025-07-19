import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const { currency } = useContext(CoinContext);  // Fixed: Added currency from context
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);  // Fixed: Initialize as null

  const fetchCoinData = async () => {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
        method: 'GET',
        headers: { accept: 'application/json' }
      });
      const data = await res.json();
      setCoinData(data);
    } catch (err) {
      console.error('Error fetching coin data:', err);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, {
        method: 'GET',
        headers: { accept: 'application/json' }
      });
      const data = await res.json();
      setHistoricalData(data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();  
  }, [coinId, currency]);  
  return (
    <div className='coin'>
      {coinData && historicalData ? (
        <>
          <div className="coin-name">
            <img src={coinData.image.large} alt={coinData.name} />
            <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
          </div>

          <div className="coin-chart">
            <LineChart historicalData={historicalData} />
          </div>
           <div className="coin-details">
            <div className="coin-info">
              <div className="info-item">
                <span>Current Price:</span>
                <span>{currency.symbol}{coinData.market_data.current_price[currency.name]?.toLocaleString()}</span>
              </div>
              <div className="info-item">
                <span>Market Cap:</span>
                <span>{currency.symbol}{coinData.market_data.market_cap[currency.name]?.toLocaleString()}</span>
              </div>
              <div className="info-item">
                <span>24h Change:</span>
                <span className={coinData.market_data.price_change_percentage_24h > 0 ? 'positive' : 'negative'}>
                  {coinData.market_data.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </div>
            </div>
            </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Coin;