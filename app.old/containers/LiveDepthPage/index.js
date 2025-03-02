/*
 * FeaturePage
 *
 * List all the features
 */
import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from '../../components/H1';
import messages from './messages';
import useBookData from './bookData';
import Plot from 'react-plotly.js';
import { ThemeContext } from '../../contexts/ThemeContext'; 

const LiveDepth = () => {
  const { isDarkMode } = useContext(ThemeContext);
  // Use the custom hook
  const bookData = useBookData(); 

  //const [delta, setDelta] = useState([]);
  const [price, setPrice] = useState([]);
  const [volume, setVolume] = useState([]);

  useEffect(() => {
    try {
      if(bookData && bookData.bids && bookData.asks) {
        const bids = bookData.bids.map(([obPrice, obVolume]) => ({
          price: parseFloat(obPrice),
          volume: parseFloat(obVolume),
        }));

        const asks = bookData.asks.map(([obPrice, obVolume]) => ({
          price: parseFloat(obPrice),
          volume: parseFloat(obVolume),
        }));

        const priceData = [...new Set([...bids.map(b => b.price), ...asks.map(a => a.price)])].sort(
          (a, b) => a - b
        );

        const volumeData = priceData.map(rangePrice => {
          let bidVolume = 0;
          let askVolume = 0;

          const bid = bids.find(b => b.price === rangePrice);
        //console.log('bid', bid);
          if (bid) {
              bidVolume = bid.volume;
          }

          const ask = asks.find(a => a.price === rangePrice);
          if (ask) {
              askVolume = ask.volume;
          }
          return bidVolume - askVolume;
        });
      
        setPrice(priceData);
        setVolume(volumeData);
      }
    } catch (e) {
      console.error('Error fetching order book data:', e);
    }
  }, [bookData]);

  const themeColors = isDarkMode
    ? {
        plot_bgcolor: '#1f1f1f',
        paper_bgcolor: '#121212',
        axisColor: '#ffffff',
        gridColor: '#333333',
        zerolineColor: '#555555',
      }
    : {
        plot_bgcolor: '#fafafa',
        paper_bgcolor: '#ffffff',
        axisColor: '#000000',
        gridColor: '#cccccc',
        zerolineColor: '#aaaaaa',
      };

  return (
    <div>
      <Helmet>
        <title>Order Book</title>
        <meta
          name="description"
          content="Feature page of React.js Boilerplate application"
        />
      </Helmet>
      <Plot
        data={[
          {
            x: price,
            y: volume,
            type: 'bar',
            marker: {
              color: volume.map(value => (value > 0 ? 'green' : 'red')),
            },
            hoverinfo: 'x+y',
          },
        ]}
        layout={{
          title: {
            text: 'Live Order Book Pressure',
            font: {
              color: isDarkMode ? '#cccccc' : '#000000',
            //size: 24, // You can adjust the font size as needed
            },
          },
          xaxis: {
            title: 'Price',
            tickangle: -90,
            showgrid: true,
            tickmode: 'array',
            tickvals: price.filter((_, index) => index % 5 === 0),
            color: themeColors.axisColor, 
            gridcolor: themeColors.gridColor, 
          },
          yaxis: {
            title: 'Volume',
            range: [-7000, 7000],
            zeroline: true,
            zerolinecolor: themeColors.zerolineColor,
            zerolinewidth: 1,
            showgrid: true,
            color: themeColors.axisColor, 
            gridcolor: themeColors.gridColor, 
          },
          margin: { t: 50, l: 50, r: 50, b: 100 },
          barmode: 'relative',
          showlegend: false,
          autosize: false, 
          width: 700, 
          height: 420, 
          plot_bgcolor: themeColors.plot_bgcolor, 
          paper_bgcolor: themeColors.paper_bgcolor, 
        }}
        config={{
          responsive: false,
          displayModeBar: false, 
        }}
      />
    </div>
  );
};

export default LiveDepth;
