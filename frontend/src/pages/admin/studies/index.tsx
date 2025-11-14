import { useEffect, useState } from "react";
import FormSearch from "./_components/FormSearch";
import MoreFunctions from "./_components/MoreFunctions";
import StudyTable from "./_components/StudyTable";
import { columns } from "./_components/columns";
import {
  getAllDiagnoses,
  getStudies,
  getStudyCount,
  getStudySize,
} from "../../../apis/dicomApis";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { setRoles } from "../../../features/userRoles";
import { mergeStudiesDiagnoseData } from "../../../utils/mergeStudiesDiagnoseData";
import type { StudyProps } from "../../../types/types";
import { X } from "lucide-react";
import { Skeleton } from "../../../components/ui/skeleton";
import { setOption } from "../../../features/navbarsection/navbarSection";
import { formSearchItems } from "../../../constants";
import { GetUserByEmail, GetEmailFromJWT } from "../../../apis/authApis";

export default function Component() {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [submitSearch, setSubmitSearch] = useState<{ [key: string]: string }>(
    {}
  );
  const [countValue, setCountValue] = useState(0);
  const [sizeValue, setSizeValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [studiesData, setStudiesData] = useState<StudyProps[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [resetResult, setResetResult] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };
  const handleSearch = () => {
    setResetResult(true);
    setSubmitSearch(formValues);
    // setFormValues({});
  };
  const handleReset = () => {
    setSubmitSearch({});
    setResetResult(false);
  };
  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      try {
        const [count, size, studies, diagnoses] = await Promise.all([
          getStudyCount(),
          getStudySize(),
          getStudies(),
          getAllDiagnoses(),
        ]);
        setCountValue(count);
        setSizeValue(size);
        setStudiesData(mergeStudiesDiagnoseData(studies, diagnoses));
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, []);
  useEffect(() => {
    const getUserFromJWT = async (jwt: string) => {
      const email = await GetEmailFromJWT(jwt);
      const userInfo = await GetUserByEmail(email.result);
      dispatch(setRoles(userInfo.result.roles));
    };
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      navigate("/");
    } else {
      getUserFromJWT(jwt);
    }
    dispatch(setOption("Studies"));
  }, []);
  useEffect(() => {
    const fromDate = new Date(submitSearch.From_date);
    const toDate = new Date(submitSearch.To_date);
    const filteredItems = studiesData.filter((item) => {
      const itemDate = new Date(item?.studyDate);
      return itemDate >= fromDate && itemDate <= toDate;
    });
    setStudiesData(filteredItems);
  }, [submitSearch.From_date, submitSearch.To_date]);

  return (
    <div className="h-full mx-6 space-y-4">
      <MoreFunctions count={countValue} size={sizeValue} />
      <div className="w-full flex md:flex-row flex-col gap-2 justify-between">
        <div className="w-full flex flex-row flex-wrap gap-4">
          {formSearchItems.map((item, index) => (
            <FormSearch
              key={index}
              value={formValues[item.name] || ""}
              onChange={(value) => handleChange(item.name, value)}
              namefield={item.name}
              typeinput={item.typeinput}
            />
          ))}
        </div>
        <div className="flex flex-col items-end justify-end">
          <button
            onClick={handleSearch}
            className="bg-bg-secondary font-semibold text-white md:px-2 p-1 w-28 rounded-md hover:bg-bg-secondary/70"
          >
            Submit
          </button>
        </div>
        <div className="flex flex-col items-end justify-end py-2">
          {resetResult && (
            <div className="flex flex-row items-center gap-2">
              <X
                size={16}
                className="text-secondary cursor-pointer"
                onClick={handleReset}
              />
            </div>
          )}
        </div>
      </div>
      <div>
        {loading ? (
          <div className="space-y-3 w-full">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex w-full items-center space-x-4">
                <div className="space-y-2 w-full">
                  <Skeleton className="h-8 w-full bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <StudyTable
            columns={columns}
            data={studiesData}
            formValues={submitSearch}
          />
        )}
      </div>
    </div>
  );
}
