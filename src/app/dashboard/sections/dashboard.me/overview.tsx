import type { ColProps } from 'antd/es/col';
import type { FC } from 'react';

import { InfoCircleOutlined } from '@ant-design/icons';
import { Badge, Card, Col, Progress, Row, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip as RTooltip, XAxis } from 'recharts';

//import { useLocale } from '@/locales';
//import { useIntl } from "react-intl";
import { injectIntl, WrappedComponentProps } from "react-intl";

//import { ReactComponent as CaretDownIcon } from './assets/caret-down.svg';
//import { ReactComponent as CaretUpIcon } from './assets/caret-up.svg';
import CaretDownIcon from "./assets/caret-down.svg";
import CaretUpIcon from "./assets/caret-up.svg";

const data = new Array(14).fill(null).map((_, index) => ({
  name: dayjs().add(index, 'day').format('YYYY-MM-DD'),
  number: Math.floor(Math.random() * 8 + 1),
}));

const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 6,
};

interface ColCardProps {
  metaName: string;
  metaCount: string;
  body: React.ReactNode;
  footer: React.ReactNode;
  loading: boolean;
}

const ColCard: FC<ColCardProps> = ({ metaName, metaCount, body, footer, loading }) => {
  return (
    <Col {...wrapperCol}>
      <Card loading={loading} className="overview" variant="outlined">
        <div className="overview-header">
          <div className="overview-header-meta">{metaName}</div>
          <div className="overview-header-count">{metaCount}</div>
          <Tooltip title="Introduce">
            <InfoCircleOutlined className="overview-header-action" />
          </Tooltip>
        </div>
        <div className="overview-body">{body}</div>
        <div className="overview-footer">{footer}</div>
      </Card>
    </Col>
  );
};

interface TrendProps {
  wow: string;
  dod: string;
  style?: React.CSSProperties;
  intl: any;
}

const Trend: FC<TrendProps & WrappedComponentProps> = ({ wow, dod, style = {}, intl }) => {
  return (
    <div className="trend" style={style}>
      <div className="trend-item">
        <span className="trend-item-label">{intl.formatMessage({ id: 'app.dashboard.overview.wowChange' })}</span>
        <span className="trend-item-text">{wow}</span>
        <CaretUpIcon className="w-6 h-6 text-green-500" />
      </div>
      <div className="trend-item">
        <span className="trend-item-label">{intl.formatMessage({ id: 'app.dashboard.overview.dodChange' })}</span>
        <span className="trend-item-text">{dod}</span>
        <CaretDownIcon className="w-6 h-6 text-red-500" />
      </div>
    </div>
  );
};

const CustomTooltip: FC<any> = ({ active, payload, label }) =>
  active && (
    <div className="customTooltip">
      <span className="customTooltip-title">
        <Badge color={payload[0].fill} /> {label} : {payload[0].value}
      </span>
    </div>
  );

interface FieldProps {
  name: string;
  number: string;
}

const Field: FC<FieldProps> = ({ name, number }) => (
  <div className="field">
    <span className="field-label">{name}</span>
    <span className="field-number">{number} </span>
  </div>
);

const Overview: FC<{ loading: boolean } & WrappedComponentProps> = ({ loading, intl }) => {
//const { formatMessage } = useLocale();
//const intl = useIntl();

  return (
    <Row gutter={[12, 12]}>
      <ColCard
        loading={loading}
        metaName={intl.formatMessage({ id: 'app.dashboard.overview.totalSales' })}
        metaCount="¥ 126,560"
        body={<Trend wow="12%" dod="12%" intl={intl} />}
        footer={<Field name={intl.formatMessage({ id: 'app.dashboard.overview.dailySales' })} number="￥12,423" />}
      />
      <ColCard
        loading={loading}
        metaName={intl.formatMessage({ id: 'app.dashboard.overview.visits' })}
        metaCount="8846"
        body={
          <ResponsiveContainer>
            <AreaChart data={data}>
              <XAxis dataKey="name" hide />
              <RTooltip content={<CustomTooltip />} />
              <Area strokeOpacity={0} type="monotone" dataKey="number" fill="#8E65D3" />
            </AreaChart>
          </ResponsiveContainer>
        }
        footer={<Field name={intl.formatMessage({ id: 'app.dashboard.overview.dailySales' })} number="1234" />}
      />
      <ColCard
        loading={loading}
        metaName={intl.formatMessage({ id: 'app.dashboard.overview.payments' })}
        metaCount="6560"
        body={
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="name" hide />
              <RTooltip content={<CustomTooltip />} />
              <Bar strokeOpacity={0} barSize={10} dataKey="number" stroke="#3B80D9" fill="#3B80D9" />
            </BarChart>
          </ResponsiveContainer>
        }
        footer={<Field name={intl.formatMessage({ id: 'app.dashboard.overview.conversionRate' })} number="60%" />}
      />
      <ColCard
        loading={loading}
        metaName={intl.formatMessage({ id: 'app.dashboard.overview.operationalEffect' })}
        metaCount="8846"
        body={<Progress strokeColor="#58BFC1" percent={85} />}
        footer={<Trend style={{ position: 'inherit' }} wow="12%" dod="12%" intl={intl} />}
      />
    </Row>
  );
};

export default injectIntl(Overview);
