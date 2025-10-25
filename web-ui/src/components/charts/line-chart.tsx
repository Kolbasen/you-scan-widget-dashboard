import type { WidgetData } from '@/types/widget.types';
import { Line, LineChart as LineChartComponent, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
  data: WidgetData[];
};

export const LineChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChartComponent data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            borderRadius: '6px',
          }}
          labelStyle={{ color: '#f3f4f6' }}
        />
        <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} />
      </LineChartComponent>
    </ResponsiveContainer>
  );
};
