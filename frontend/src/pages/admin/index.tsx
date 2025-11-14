import ColumnDicomChart from "../../components/ColumnDicomChart";
import DicomChart from "../../components/DicomChart";
import MyChart from "../../components/LineChart";
import MoreInforCard from "./_components/MoreInforCard";
import { useEffect, useState } from "react";
import {
  getPatients,
  getStudies,
  getStudyCount,
  getStudySize,
} from "../../apis/dicomApis";
import { useNavigate } from "react-router-dom";
import type { PatientProps } from "../../types/types";
import { inforCard } from "../../constants";
import type { User } from "./usermanagement/_components/columns";
import { GetAllUsers } from "../../apis/authApis";

export default function Component() {
  const [countValue, setCountValue] = useState(0);
  const [sizeValue, setSizeValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [studiesData, setStudiesData] = useState([]);
  const [patients, setPatients] = useState<PatientProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (token === null) {
          navigate("/");
        } else {
          const [count, size, studies, patients, users] = await Promise.all([
            getStudyCount(),
            getStudySize(),
            getStudies(),
            getPatients(token),
            GetAllUsers(),
          ]);
          setCountValue(count);
          setSizeValue(size);
          setStudiesData(studies);
          setPatients(patients);
          setUsersData(users);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);
  inforCard[0].content = patients.length.toString();
  inforCard[1].content = usersData.length.toString();
  inforCard[2].content = sizeValue.toString() + " MB";
  inforCard[3].content = studiesData.length.toString();

  return (
    <div className="mx-6 flex flex-col gap-4 ">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        {inforCard.map((item, index) => (
          <MoreInforCard
            key={index}
            title={item.title}
            iconsvg={item.iconsvg}
            linkValue={item.linkValue}
            bg_color={item.bg_color}
            content={item.content}
            isLoading={loading}
          />
        ))}
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1">
        <div className="outline-none w-full h-full">
          <MyChart />
        </div>
        <div className="outline-none w-full h-full">
          <DicomChart />
        </div>
      </div>
      <div className="max-w-full mb-10">
        <ColumnDicomChart />
      </div>
    </div>
  );
}
