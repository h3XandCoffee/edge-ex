/**
 *
 */
import React, { useState, useEffect } from 'react';
import useOrdersBinance from '../../apis/ordersBinance';
import useOrdersBybit from '../../apis/ordersBybit';
export const scope = 'boilerplate.containers.LiveDepthPage';

const aggregateOrderBooks = (orderBookEach) => {
  const mergedBids = [];
  const mergedAsks = [];
  let allBids = 0;
  let allAsks = 0;

  Object.entries(orderBookEach).forEach(([exchange, exchangeData]) => {
    //console.log(exchange, exchangeData);
    
    if (exchangeData && exchangeData.bids && exchangeData.asks) {
      let totalBids = 0;
      let totalAsks = 0;

      exchangeData.bids.forEach((bid) => {
        const existingBid = mergedBids.find((b) => b[0] === bid[0]);
        //const matches = asks.filter((bid) => bid[0] === 21.79);
        //const copy = [...result]; // Creates a shallow copy of the small array

        if (existingBid) {
          existingBid[1] += bid[1];
        } else {
          mergedBids.push([ bid[0], bid[1] ]);
        }
        allBids = allBids + bid[0];
        totalBids = totalBids + bid[0];
      });

      exchangeData.asks.forEach((ask) => {
        const existingAsk = mergedAsks.find((a) => a[0] === ask[0]);
        //const matches = asks.filter((bid) => bid[0] === 21.79);
        //const copy = [...result]; // Creates a shallow copy of the small array

        if (existingAsk) {
          existingAsk[1] += ask[1];
        } else {
          mergedAsks.push([ask[0], ask[1]]);
        }
        allAsks = allAsks + ask[0];
        totalAsks = totalAsks + ask[0];
      });

      //console.log(exchange, totalBids, totalAsks);
    }
  });

  mergedBids.sort((a, b) => b[0] - a[0]); 
  mergedAsks.sort((a, b) => a[0] - b[0]); 

  //console.log(allBids, allAsks);
  //console.log('All', { bids: mergedBids, asks: mergedAsks });
  return { bids: mergedBids, asks: mergedAsks };
};

const useBookData = (() => {
  const ordersBinance = useOrdersBinance();
  const ordersBybit = useOrdersBybit();
  const [bookEach, setBookEach] = useState({
    Binance: null,
    Bybit: null,
  });
  const [bookData, setBookData] = useState({
    bids: [],
    asks: [],
  });

  useEffect(() => {
    try {
      //console.log('setBookData ordersBinance', ordersBinance);

      if(ordersBinance && ordersBinance.bids && ordersBinance.asks) {
        setBookEach((prev) => ({
          ...prev,
          Binance: {
            bids: ordersBinance.bids || [],
            asks: ordersBinance.asks || [],
          },
        }));
      }
    }
    catch(e) {
      console.error('Error fetching order book data from Binance:', e);
    }
  }, [ordersBinance]);
  
  useEffect(() => {
    try {
      //console.log('setBookData ordersBybit', ordersBybit);

      if(ordersBybit && ordersBybit.bids && ordersBybit.asks) {
        setBookEach((prev) => ({
          ...prev,
          Bybit: {
            bids: ordersBybit.bids || [],
            asks: ordersBybit.asks || [],
          },
        }));
      }
    }
    catch(e) {
      console.error('Error fetching order book data from Bybit:', e);
    }
  }, [ordersBybit]);
  
  useEffect(() => {
    setBookData(aggregateOrderBooks(bookEach));
  //console.log('bookData updated', bookData);
  }, [bookEach]);

  return bookData;
});

export default useBookData;
