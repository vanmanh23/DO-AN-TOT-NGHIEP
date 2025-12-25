import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
// import { getStudies } from "../apis/dicomApis";

export default function DicomChart() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //       const res = await getStudies();
  //       setData(res);
  //   }
  //   fetchData();
  // }, []);
  return (
    <div className="w-full h-96 bg-white rounded-lg shadow">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart >
        {/* <LineChart data={data}> */}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="studyDate" />
          <YAxis dataKey="numberOfInstances" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="numberOfInstances" stroke="#8884d8" name="numberOfInstances" />
          <Line type="monotone" dataKey="studyInstanceUID" stroke="#fa0064" name="Số Series" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
