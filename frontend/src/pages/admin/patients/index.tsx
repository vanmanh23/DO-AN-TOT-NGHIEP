import { useEffect, useState } from "react";
import type { PatientProps } from "../../../types/types";
import SearchPatient from "./_components/SearchPatient";
import { Skeleton } from "../../../components/ui/skeleton";
import PatientsRender from "./_components/PatientsRender";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { setOption } from "../../../features/navbarsection/navbarSection";
import patientApi from "../../../apis/patientApis";

export default function Component() {
  const [patients, setPatients] = useState<PatientProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState<{
    patientName: string;
    sex: string;
  }>({ patientName: "", sex: "" });
  const [searchValues, setSearchValues] = useState<{
    patientName: string;
    sex: string;
  }>({ patientName: "", sex: "" });
  const patientNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, patientName: e.target.value });
  };
  const sexValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, sex: e.target.value });
  };
  const dispatch = useDispatch<AppDispatch>();
  const handleSearch = () => {
    setSearchValues(formValues);
  };
  const handleReset = () => {
    setSearchValues({
      patientName: "",
      sex: "",
    });
  };
  useEffect(() => {
    setLoading(true);
    try {
      const fetchPatients = async () => {
        const res = await patientApi.getAll();
        setPatients(res.result);
      };
      fetchPatients();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    dispatch(setOption("Patients"));
  }, []);
  return (
    <div className="flex flex-col gap-3 px-6">
      <div>
        <SearchPatient
          patientNameValue={patientNameValue}
          sexValue={sexValue}
          handleSearch={handleSearch}
          patientNumber={patients.length}
          handleReset={handleReset}
        />
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
          <PatientsRender
            patientName={searchValues.patientName}
            sex={searchValues.sex}
          />
        )}
      </div>
    </div>
  );
}
