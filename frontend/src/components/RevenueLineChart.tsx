import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function RevenueLineChart({ apiData }) {
  const data = transformMonthlyRevenue(apiData);

  return (
     <div className="w-full h-96 bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-4">
        Monthly Revenue
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          
          <XAxis dataKey="period" />
          
          <YAxis
            tickFormatter={(value) =>
              `${(value / 1000000).toFixed(1)}M`
            }
          />

          <Tooltip
            formatter={(value) =>
              `${value.toLocaleString()} VND`
            }
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="revenue"
            name="Revenue (VND)"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const transformMonthlyRevenue = (apiData) => {
  return apiData.map((item) => ({
    period: `${item.month}/${item.year}`,
    revenue: item.totalRevenue,
  }));
};
