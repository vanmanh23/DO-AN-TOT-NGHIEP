import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { PatientProps } from "../../../../types/types";
import patientApi from "../../../../apis/patientApis";

type PatientsProps = {
  patientName?: string;
  sex?: string;
};

export default function PatientsRender({ patientName, sex }: PatientsProps) {
  const [listPatient, setListPatient] = useState<PatientProps[]>([]);
  const [headTableforPatients, setHeadTableforPatients] = useState({
    isHeadTitle: true,
    isKey: "",
  });
  const [openPatient, setOpenPatient] = useState<{ [key: number]: boolean }>(
    {}
  );
  const togglePatient = (index: number) => {
    setOpenPatient((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  const forcusOnPatients = (patientID: string) => {
    setHeadTableforPatients({
      isHeadTitle: true,
      isKey: patientID,
    })
  };

  // Fetch all patients once on mount
  useEffect(() => {
    patientApi.getAll().then((res) => setListPatient(res.result));
  }, []);

  // Filter patients based on search criteria (không dựa vào listPatient state)
  useEffect(() => {
    patientApi.getAll().then((res) => {
      let filtered = res.result ?? [];

      if (patientName?.trim()) {
        const q = patientName.toLocaleLowerCase();
        filtered = filtered.filter((patient) =>
          patient.name?.toLocaleLowerCase().includes(q)
        );
      }

      if (sex?.trim()) {
        const q = sex.toUpperCase();
        filtered = filtered.filter((patient) =>
          patient?.gender?.toUpperCase().includes(q)
        );
      }

      setListPatient(filtered);
    });
  }, [patientName, sex]);

  return (
    <div className="container overflow-x-auto mx-auto w-full flex justify-center">
      <table className="w-full min-w-[600px] table-fixed">
        <thead className="bg-bg-secondary text-white overflow-hidden">
          {headTableforPatients.isHeadTitle && (
            <tr className=" overflow-hidden text-xs">
              <th className="px-4 py-2 text-left" colSpan={1}></th>
              <th className="px-4 py-2 text-left" colSpan={3}>
                Patient Name
              </th>
              <th className="px-4 py-2 text-left" colSpan={5}>
                Patient ID
              </th>
              <th className="px-4 py-2 text-left" colSpan={2}>
                BirthDate
              </th>
              <th className="px-4 py-2 text-left" colSpan={2}>
                Sex
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {/* Patients */}
          {listPatient?.map((item: PatientProps, index: number) => (
            <React.Fragment key={index}>
              <tr
                key={index}
                className={`overflow-hidden text-xs h-11 ${
                  headTableforPatients.isKey === item.patientID
                    ? "bg-gray-300"
                    : ""
                }`}
                onMouseMove={() => forcusOnPatients(item.patientID)}
              >
                <td className="px-4 py-2 " colSpan={1}>
                  <div className="flex flex-row justify-between">
                    <p>{index + 1}</p>
                    <div className="flex flex-row gap-2 items-center">
                      {/* <List size={18} className="cursor-pointer" /> */}
                      {openPatient[index] ? (
                        <ChevronDown
                          size={18}
                          onClick={() => togglePatient(index)}
                          className="cursor-pointer"
                        />
                      ) : (
                        <ChevronRight
                          size={18}
                          onClick={() => togglePatient(index)}
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                </td>
                <td className="border px-4 py-2" colSpan={3}>
                  {item.name}
                </td>
                <td className="border px-4 py-2" colSpan={5}>
                  {item.patientID}
                </td>
                <td className="border px-4 py-2" colSpan={2}>
                  {new Date(item.birthdate).toLocaleDateString("vi-VN")}
                </td>
                <td className="border px-4 py-2" colSpan={2}>
                  {item.gender}
                </td>
              </tr>
            </React.Fragment>
          ))}
          {listPatient.length === 0 && (
            <React.Fragment>
              <tr>
                <td colSpan={12} className="text-center">
                  Not found
                </td>
              </tr>
            </React.Fragment>
          )}
        </tbody>
      </table>
    </div>
  );
}
