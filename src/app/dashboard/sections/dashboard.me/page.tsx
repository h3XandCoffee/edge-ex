"use client";

import type { FC } from 'react';

//import './index.less';
import './index.scss';

import { useEffect, useState } from 'react';
import { injectIntl, WrappedComponentProps } from "react-intl";

import Overview from './overview';
import SalePercent from './salePercent';
import TimeLine from './timeLine';

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

  return (
    <div>
      <Overview loading={loading} />
      <SalePercent loading={loading} />
      <TimeLine loading={loading} />
    </div>
  );
};

export default injectIntl(DashBoardPage);
