/**
 *
 */
import axios from 'axios';
import { useState, useEffect } from 'react';

const useOrdersBybit = (symbol = 'INJUSDT', depth = 100) => {
  const [ordersBybit, setOrdersBybit] = useState({ bids: [], asks: [], lastUpdated: null });

  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        const response = await axios.get('https://api.bybit.com/v5/market/orderbook', {
          params: {
            category: 'spot', 
            symbol: symbol,
            limit: depth,
          },
        });
        const { b: bids, a: asks } = response.data.result;
        
        const normalizedBids = bids.map(([price, size]) => ([
          parseFloat(parseFloat(price).toFixed(2)),
          parseFloat(size)
        ]));
    
        const normalizedAsks = asks.map(([price, size]) => ([
          parseFloat(parseFloat(price).toFixed(2)),
          parseFloat(size)
        ]));
        
        setOrdersBybit({  
          bids: [...normalizedBids], 
          asks: [...normalizedAsks],
          lastUpdated: Date.now(),
        });
      } catch (e) {
        console.error('Error fetching order book data from Binance:', e);
      }
    };

    fetchOrderBook();
    const interval = setInterval(() => {
        fetchOrderBook();
    }, 2000); 
    return () => clearInterval(interval);
  }, [symbol, depth]);

  useEffect(() => {
    //console.log('ordersBybit updated', ordersBybit);
  }, [ordersBybit]);

  return ordersBybit;  
};

export default useOrdersBybit;
