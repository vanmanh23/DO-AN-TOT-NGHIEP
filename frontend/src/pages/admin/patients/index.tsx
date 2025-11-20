import { useEffect, useState } from "react";
import { Skeleton } from "../../../components/ui/skeleton";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { setOption } from "../../../features/navbarsection/navbarSection";
import patientApi from "../../../apis/patientApis";
import SearchPatient from "./_components/SearchPatient";
import PatientsRender from "./_components/PatientsRender";
import type { PatientResponse } from "../../../types/order";

export default function Component() {
  const [patients, setPatients] = useState<PatientResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState<{
    patientName: string;
    patientGender: string;
    patientIdInput: string;
  }>({ patientName: "", patientGender: "", patientIdInput: "" });
  const [searchValues, setSearchValues] = useState<{
    patientName: string;
    patientGender: string;
    patientIdInput: string;
  }>({ patientName: "", patientGender: "",  patientIdInput: "" });
  const patientNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, patientName: e.target.value });
  };
  const patientGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, patientGender: e.target.value });
  };
    const patientIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, patientIdInput: e.target.value });
  };
  const dispatch = useDispatch<AppDispatch>();
  const handleSearch = () => {
    setSearchValues(formValues);
  };
  const handleReset = () => {
    setSearchValues({
      patientName: "",
      patientGender: "",
      patientIdInput: "",
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
          handleSearch={handleSearch}
          patientNumber={patients.length}
          handleReset={handleReset}
          patientType={patientGender}
          findById={patientIdInput}
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
            sex={searchValues.patientGender}
            findById={searchValues.patientIdInput}
          />
        )}
      </div>
    </div>
  );
}
