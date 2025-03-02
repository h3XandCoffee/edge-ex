/**
 *
 */
import { useState, useEffect } from 'react';

const useOrdersBinance = (symbol = 'INJUSDT', depth = 100) => {
  const [ordersBinance, setOrdersBinance] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://api.binance.com/api/v3/depth?symbol=` + symbol + `&limit=` + depth);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();

        const normalizedBids = data.bids.map(([price, size]) => ([
          parseFloat(parseFloat(price).toFixed(2)),
          parseFloat(size)
        ]));
    
        const normalizedAsks = data.asks.map(([price, size]) => ([
          parseFloat(parseFloat(price).toFixed(2)),
          parseFloat(size)
        ]));
        
        setOrdersBinance({  
          bids: [...normalizedBids], 
          asks: [...normalizedAsks],
          lastUpdated: Date.now(),
        });
      } catch (e) {
        console.error('Error fetching order book data from Binance:', e);
      }
    };

    fetchOrders();
    const interval = setInterval(() => {
        fetchOrders();
    }, 2000); 
    return () => clearInterval(interval);
  }, [symbol, depth]);

  return ordersBinance;
};

export default useOrdersBinance;
