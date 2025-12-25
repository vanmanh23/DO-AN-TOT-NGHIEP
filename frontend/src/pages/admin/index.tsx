import ColumnDicomChart from "../../components/ColumnDicomChart";
import DicomChart from "../../components/DicomChart";
import MyChart from "../../components/LineChart";
import MoreInforCard from "./_components/MoreInforCard";
import { useEffect, useState } from "react";
import {
  getStudies,
  getStudyCount,
  getStudySize,
} from "../../apis/dicomApis";
import { useNavigate } from "react-router-dom";
import { inforCard } from "../../constants";
import { GetAllUsers, type UserResponseDTO } from "../../apis/authApis";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { setOption } from "../../features/navbarsection/navbarSection";
import patientApi from "../../apis/patientApis";

export default function Component() {
  const [countValue, setCountValue] = useState(0);
  const [sizeValue, setSizeValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState<UserResponseDTO[]>([]);
  const [numOfPatients, setNumOfPatients] = useState(0);
  const navigate = useNavigate();
   const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (token === null) {
          navigate("/");
        } else {
          const [count, size, numOfPatient, users] = await Promise.all([
            getStudyCount(),
            getStudySize(),
            // getStudies(),
            (await patientApi.patientCount()).result,
            (await GetAllUsers()).result,
          ]);
          setCountValue(count);
          setSizeValue(size);
          // setStudiesData(studies);
          // setPatients(patients);
          setNumOfPatients(numOfPatient);
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

     useEffect(() => {
    dispatch(setOption("Dashboard"));
  }, []);

  inforCard[0].content = numOfPatients.toString() ;
  inforCard[1].content = usersData.length.toString();
  inforCard[2].content = sizeValue.toString() + " MB";
  inforCard[3].content = countValue.toString();

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
