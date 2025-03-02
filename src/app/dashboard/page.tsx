
"use client";

import type { FC } from 'react';

//import './index.less';
//import './index.scss';
import './styles/index.scss';
import './mock';
import App from './App';
import store from './stores';

import { useEffect, useState } from 'react';
import { injectIntl, WrappedComponentProps } from "react-intl";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

//import Overview from './overview';
//import SalePercent from './salePercent';
//import TimeLine from './timeLine';

const DashBoardPage: FC<WrappedComponentProps> = ({ intl }) => {
  const [loading, setLoading] = useState(true);

  // mock timer to mimic dashboard data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(undefined as any);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  /*
  return (
    <div>
      <Overview loading={loading} />
      <SalePercent loading={loading} />
      <TimeLine loading={loading} />
    </div>
  );
  */
  
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <App />  
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default injectIntl(DashBoardPage);
