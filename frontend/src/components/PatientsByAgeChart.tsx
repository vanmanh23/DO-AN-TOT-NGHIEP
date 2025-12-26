import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function PatientsByAgeChart({ data }) {
  return (
    <div className="w-full h-96 bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-4">
        Patients by Age Group
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          
          <XAxis dataKey="ageGroup" />
          <YAxis allowDecimals={false} />

          <Tooltip />
          <Legend />

          <Bar
            dataKey="totalPatients"
            name="Number of Patients"
            radius={[6, 6, 0, 0]}
            fill="#22c55e"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
