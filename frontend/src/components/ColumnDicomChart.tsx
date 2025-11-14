import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getStudies } from "../apis/dicomApis";

export default function ColumnDicomChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getStudies();
      setData(res);
    };
    fetchData();
  }, []);
  return (
    <div className="w-full h-96 bg-white rounded-lg shadow">
      <h2 className="md:text-lg text-sm font-semibold mb-4 text-secondary">
        The bar chart shows the quantity of studies and series
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="studyDate" />
          <YAxis dataKey="numberOfInstances" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="studyDate"
            barSize={40}
            fill="#8884d8"
            name="studyDate"
          />
          <Line
            type="monotone"
            dataKey="numberOfInstances"
            stroke="#0bef1a"
            strokeWidth={2}
            name="numberOfInstances"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
