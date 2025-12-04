import React, { useEffect, useState } from "react";
import type { PatientResponse } from "../../../../types/order";
import patientApi from "../../../../apis/patientApis";
import PatientsAction from "./PatientsAction";
import { Skeleton } from "../../../../components/ui/skeleton";

type PatientsProps = {
  patientName?: string;
  sex?: string;
  findById?: string;
};

export default function PatientsRender({
  patientName,
  sex,
  findById,
}: PatientsProps) {
  const [patients, setPatients] = useState<PatientResponse[]>();
  const [loading, setLoading] = useState(true);
  const [headTableforPatients, setHeadTableforPatients] = useState({
    isHeadTitle: true,
    isKey: "",
  });
  const forcusOnPatients = (orderID: string) => {
    setHeadTableforPatients({
      isHeadTitle: true,
      isKey: orderID,
    });
  };

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      const res = await patientApi.getAll();
      setPatients(res.result as unknown as PatientResponse[]);
      setLoading(false);
    };
    fetchPatients();
  }, []);
  useEffect(() => {
    patientApi.getAll().then((res) => {
      setLoading(true);
      let filtered = res.result as unknown as PatientResponse[];
      if (patientName?.trim()) {
        const q = patientName.toLocaleLowerCase();
        filtered = filtered.filter((patient: PatientResponse) =>
          patient.patientName?.toLocaleLowerCase().includes(q)
        );
      }

      if (sex?.trim()) {
        const q = sex.toUpperCase();
        filtered = filtered.filter((patient: PatientResponse) =>
          patient?.gender?.toUpperCase().includes(q)
        );
      }
      if (findById?.trim()) {
        const q = findById.toLocaleLowerCase();
        filtered = filtered.filter((patient: PatientResponse) =>
          patient.id?.toLocaleLowerCase().includes(q)
        );
      }
      setPatients(filtered);
      setLoading(false);
    });
  }, [patientName, sex, findById]);

  const renderSkeletonRows = () => {
    return (
      <>
        {[1, 2, 3, 4, 5].map((i) => (
          <tr
            key={i}
            className="block md:table-row mb-4 md:mb-0 rounded-lg border p-3 "
          >
            {[...Array(9)].map((_, idx) => (
              <td key={idx} className="p-3 block md:table-cell  md:border-0">
                <Skeleton className="h-4 w-full bg-slate-100" />
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className="container overflow-x-auto mx-auto w-full flex justify-center">
      <table className="w-full min-w-[600px] table-fixed">
        <thead className="bg-bg-secondary text-white overflow-hidden">
          {headTableforPatients.isHeadTitle && (
            <tr className=" overflow-hidden text-xs">
              <th className="px-1 py-2 text-center" colSpan={1}>
                STT
              </th>
              <th className="px-1 py-2 text-center" colSpan={3}>
                Patient Name
              </th>
              <th className="px-1 py-2 text-center" colSpan={5}>
                Patient ID
              </th>
              <th className="px-1 py-2 text-center" colSpan={2}>
                BirthDate
              </th>
              <th className="px-1 py-2 text-center" colSpan={2}>
                age
              </th>
              <th className="px-1 py-2 text-center" colSpan={5}>
                address
              </th>
              <th className="px-1 py-2 text-center" colSpan={2}>
                phoneNumber
              </th>
              <th className="px-1 py-2 text-center" colSpan={1}>
                action
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {loading && renderSkeletonRows()}
          {!loading &&
            patients?.map((item: PatientResponse, index: number) => (
              <React.Fragment key={index}>
                <tr
                  key={index}
                  className={`overflow-hidden text-xs h-11 ${
                    headTableforPatients.isKey === item.id ? "bg-gray-200" : ""
                  }`}
                  onMouseMove={() => forcusOnPatients(item.id || "")}
                >
                  <td className="border px-4 py-2 " colSpan={1}>
                    <div className="flex flex-row justify-between">
                      <p>{index + 1}</p>
                    </div>
                  </td>
                  <td className="border px-4 py-2" colSpan={3}>
                    {item.patientName}
                  </td>
                  <td className="border px-4 py-2" colSpan={5}>
                    {item.id}
                  </td>
                  <td className="border px-4 py-2" colSpan={2}>
                    {new Date(item.patientBirthDate).toLocaleDateString(
                      "vi-VN"
                    )}
                  </td>
                  <td className="border px-4 py-2" colSpan={2}>
                    {item.age}
                  </td>
                  <td className="border px-4 py-2" colSpan={5}>
                    {item.address}
                  </td>
                  <td className="border px-4 py-2" colSpan={2}>
                    {item.phoneNumber}
                  </td>
                  <td
                    className="cursor-pointer border px-4 py-2 z-20"
                    colSpan={1}
                  >
                    <PatientsAction patients={item} />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          {patients?.length === 0 && (
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
