import React, { useEffect, useState } from "react";
import type { DoctorResponse } from "../../../../types/order";
import DoctorAction from "./DoctorAction";
import doctorsApi from "../../../../apis/doctorApis";
import { renderSkeletonRows } from "../../../../components/renderSkeletonRows";

type doctorsProps = {
  doctorName?: string;
  doctorCode?: string;
  gender?: string;
  getDoctorsCount: (count: number) => void;
};

export default function DoctorsRender({
  doctorName,
  doctorCode,
  gender,
  getDoctorsCount,
}: doctorsProps) {
  const [doctors, setDoctors] = useState<DoctorResponse[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [headTableforDoctors, setHeadTableforDoctors] = useState({
    isHeadTitle: true,
    isKey: "",
  });
  const forcusOnDoctor = (doctorID: string) => {
    setHeadTableforDoctors({
      isHeadTitle: true,
      isKey: doctorID,
    });
  };

  // Fetch all patients once on mount
  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      const res = await doctorsApi.getAll();
      setDoctors(res.result as unknown as DoctorResponse[]);
      setIsLoading(false);
    };
    fetchOrder();
  }, []);
  useEffect(() => {
    doctorsApi.getAll().then((res) => {
      setIsLoading(true);
      let filtered = res.result as unknown as DoctorResponse[];
      if (doctorName?.trim()) {
        const q = doctorName.toLocaleLowerCase();
        filtered = filtered.filter((doctor: DoctorResponse) =>
          doctor.fullName?.toLocaleLowerCase().includes(q)
        );
      }
      if (doctorCode?.trim()) {
        const q = doctorCode.toUpperCase();
        filtered = filtered.filter((doctor: DoctorResponse) =>
          doctor?.doctorCode?.toUpperCase().includes(q)
        );
      }
      if (gender?.trim()) {
        const q = gender.toUpperCase();
        filtered = filtered.filter((doctor: DoctorResponse) =>
          doctor?.gender.toUpperCase().includes(q)
        );
      }
      setDoctors(filtered);
      setIsLoading(false);
    });
  }, [doctorCode, doctorName, gender]);
  if (doctors && typeof getDoctorsCount === "function") {
    getDoctorsCount(doctors.length);
  }

  return (
    <div className="container overflow-x-auto mx-auto w-full flex justify-center">
      <table className="w-full min-w-[600px] table-fixed">
        <thead className="bg-bg-secondary text-white overflow-hidden">
          {headTableforDoctors.isHeadTitle && (
            <tr className=" overflow-hidden text-xs">
              <th className="px-1 py-2 text-center" colSpan={1}>
                STT
              </th>
              <th className="px-1 py-2 text-center" colSpan={4}>
                doctor Name
              </th>
              <th className="px-1 py-2 text-center" colSpan={3}>
                doctor Code
              </th>
              <th className="px-1 py-2 text-center" colSpan={3}>
                Gender
              </th>
              <th className="px-1 py-2 text-center" colSpan={2}>
                Phone Number
              </th>
              <th className="px-1 py-2 text-center" colSpan={1}>
                action
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {isLoading && renderSkeletonRows({ counts: [1, 4, 3, 3, 2, 1]})}
          {!isLoading && doctors?.map((item: DoctorResponse, index: number) => (
            <React.Fragment key={index}>
              <tr
                key={index}
                className={`overflow-hidden text-xs h-11 ${
                  headTableforDoctors.isKey === item.id
                    ? "bg-gray-200"
                    : ""
                }`}
                onMouseMove={() => forcusOnDoctor(item.id as string)}
              >
                <td className="border px-4 py-2 " colSpan={1}>
                  <div className="flex flex-row justify-between">
                    <p>{index + 1}</p>
                  </div>
                </td>
                <td className="border px-4 py-2" colSpan={4}>
                  {item.fullName}
                </td>
                <td className="border px-4 py-2 truncate" colSpan={3}>
                  {item.doctorCode}
                </td>
                <td className="border px-4 py-2" colSpan={3}>
                  {item.gender}
                </td>
                <td className="border px-4 py-2" colSpan={2}>
                  {item.phoneNumber}
                </td>
                <td
                  className="cursor-pointer border px-4 py-2 z-20"
                  colSpan={1}
                >
                  <DoctorAction doctors={item} />
                </td>
              </tr>
            </React.Fragment>
          ))}
          {doctors?.length === 0 && (
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
