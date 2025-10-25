import type { WidgetData } from '@/types/widget.types';
import { Bar, BarChart as BarChartComponent, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Props = {
  data: WidgetData[];
};

export const BarChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChartComponent data={data}>
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
          cursor={{ fill: 'transparent' }}
        />
        <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
      </BarChartComponent>
    </ResponsiveContainer>
  );
};
