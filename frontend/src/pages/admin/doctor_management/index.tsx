import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { setOption } from "../../../features/navbarsection/navbarSection";
import DoctorsRender from "./_components/DoctorsRender";
import SearchDoctor from "./_components/SearchDoctor";

export default function Component() {
  const [getDoctorsCount, setDoctorsCount] = useState(0);
  const [formValues, setFormValues] = useState<{
    doctor_name: string;
    gender: string;
    doctor_code?: string;
  }>({ doctor_name: "", gender: "", doctor_code: "" });
  const [searchValues, setSearchValues] = useState<{
    doctor_name: string;
    gender: string;
    doctor_code?: string;
  }>({ doctor_name: "", gender: "", doctor_code: "" });
  const doctorNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, doctor_name: e.target.value });
  };
  const gender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, gender: e.target.value });
  };
  const doctor_codeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, doctor_code: e.target.value });
  };
  const dispatch = useDispatch<AppDispatch>();
  const handleSearch = () => {
    setSearchValues(formValues);
  };
  const handleGetDoctorsCount  =  (count: number) => {
    setDoctorsCount(count);
  }
  const handleReset = () => {
    setFormValues({
      doctor_name: "",
      gender: "",
      doctor_code: "",
    })
    setSearchValues({
      doctor_name: "",
      gender: "",
      doctor_code: "",
    });
  };
  useEffect(() => {
    dispatch(setOption("Doctors Management"));
  }, []);
  return (
    <div className="flex flex-col gap-3 px-6">
      <div>
        <SearchDoctor
          doctorNameValue={doctorNameValue}
          gender={gender}
          doctorCodeValue={doctor_codeValue}
          handleSearch={handleSearch}
          ordersNumber={getDoctorsCount}
          handleReset={handleReset}
        />
      </div>
      <div>
          <DoctorsRender
            doctorName={searchValues.doctor_name}
            doctorCode={searchValues.doctor_code}
            gender={searchValues.gender}
            getDoctorsCount={handleGetDoctorsCount}
          />
      </div>
    </div>
  );
}
