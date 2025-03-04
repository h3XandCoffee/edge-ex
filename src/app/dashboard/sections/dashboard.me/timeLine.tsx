import type { FC } from 'react';

import { Badge, Card } from 'antd';
import dayjs from 'dayjs';
import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { injectIntl, WrappedComponentProps } from "react-intl";

const data = new Array(20).fill(null).map((_, index) => ({
  name: dayjs()
    .add(index * 30, 'minute')
    .format('HH:mm'),
  traffic: Math.floor(Math.random() * 120 + 1),
  payments: Math.floor(Math.random() * 120 + 1),
}));

const CustomTooltip: FC<any & WrappedComponentProps> = ({ active, payload, label, intl }) => {
//const intl = useIntl();

  if (active) {
    const { value: value1, stroke: stroke1 } = payload[0];
    const { value: value2, stroke: stroke2 } = payload[1];

    return (
      <div className="customTooltip">
        <span className="customTooltip-title">{label}</span>
        <ul className="customTooltip-content">
          <li key="traffic">
            <Badge color={stroke1} />
            <span>{intl.formatMessage({ id: "app.dashboard.timeline.traffic" })}</span> {value1}
          </li>
          <li key="payments">
            <Badge color={stroke2} />
            <span>{intl.formatMessage({ id: "app.dashboard.timeline.payments" })}</span> {value2}
          </li>
        </ul>
      </div>
    );
  }

  return null;
};

const TimeLine: FC<{ loading: boolean } & WrappedComponentProps> = ({ loading, intl }) => {

  return (
    <Card loading={loading} style={{ marginTop: 12 }}>
      <ResponsiveContainer height={400}>
        <LineChart data={data} syncId="anyId">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip intl={ intl }/>} />
          <Line type="monotone" dataKey="traffic" stroke="#3F90F7" />
          <Line type="monotone" dataKey="payments" stroke="#61BE82" />
          <Brush dataKey="name" fill="#13c2c2" />
          <Legend
            verticalAlign="top"
            height={40}
            formatter={value => <span>{intl.formatMessage({ id: 'app.dashboard.timeline.'  + value})} as any </span>}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default injectIntl(TimeLine);
