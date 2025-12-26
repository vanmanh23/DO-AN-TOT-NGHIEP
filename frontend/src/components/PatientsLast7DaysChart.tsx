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
import CalendarDialog from "./CalendarDialog";
import type { DateRange } from "react-day-picker";

interface FilterSectionProps {
  date: DateRange | undefined
  onDateChange: (range: DateRange | undefined) => void
}

export default function PatientsLast7DaysChart({ data, date, onDateChange }: { data: any[] } & FilterSectionProps) {
  return (
    <div className="w-full h-80 bg-white rounded shadow p-4">
      <div className="flex flex-row items-center gap-4">
        <h2 className="text-lg font-semibold">Patients in 7 Days</h2>
        <CalendarDialog selectedDate={date} setSelectedDate={onDateChange}/>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          {/* Trục X: Ngày */}
          <XAxis
            dataKey="date"
            interval={0} // 7 ngày → hiển thị hết
          />

          {/* Trục Y: Số bệnh nhân */}
          <YAxis allowDecimals={false} />

          <Tooltip
            formatter={(value) => `${value} patients`}
            labelFormatter={(label) => `Date: ${label}`}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="totalPatients"
            name="Number of Patients"
            stroke="#16a34a"
            strokeWidth={1}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
