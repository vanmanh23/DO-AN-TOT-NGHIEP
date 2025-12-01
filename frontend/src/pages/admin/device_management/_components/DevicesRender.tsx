import React, { useEffect, useState } from "react";
import type { Modality } from "../../../../types/order";
import DevicesAction from "./DevicesAction";
import devicesApi from "../../../../apis/deviceApis";

type DevicesProps = {
  status?: string;
  type?: string;
  getDevicesCount: (count: number) => void;
};

export default function ServiceItemsRender({
  status,
  type,
  getDevicesCount,
}: DevicesProps) {
  const [modalities, setModalities] = useState<Modality[]>();
  const [headTableforDevices, setHeadTableforDevices] = useState({
    isHeadTitle: true,
    isKey: "",
  });
  const forcusOnPatients = (orderID: string) => {
    setHeadTableforDevices({
      isHeadTitle: true,
      isKey: orderID,
    });
  };

  // Fetch all patients once on mount
  useEffect(() => {
    const fetchDevices = async () => {
      const res = await devicesApi.getAll();
      setModalities(res.result as unknown as Modality[]);
    };
    fetchDevices();
  }, []);
  useEffect(() => {
    devicesApi.getAll().then((res) => {
      let filtered = res.result as unknown as Modality[];
      if (status?.trim()) {
        const q = status.toLocaleLowerCase();
        filtered = filtered.filter((serviceItem: Modality) =>
          serviceItem.status?.toLocaleLowerCase().includes(q)
        );
      }
      if (type?.trim()) {
        const q = type.toUpperCase();
        filtered = filtered.filter((serviceItem: Modality) =>
          serviceItem?.type?.toUpperCase().includes(q)
        );
      }
      setModalities(filtered);
    });
  }, [type, status]);
  if (modalities && typeof getDevicesCount === "function") {
    getDevicesCount(modalities.length);
  }
  return (
    <div className="container overflow-x-auto mx-auto w-full flex justify-center">
      <table className="w-full min-w-[600px] table-fixed">
        <thead className="bg-bg-secondary text-white overflow-hidden">
          {headTableforDevices.isHeadTitle && (
            <tr className=" overflow-hidden text-xs">
              <th className="px-1 py-2 text-center" colSpan={1}>
                STT
              </th>
              <th className="px-1 py-2 text-center" colSpan={2}>
                Model
              </th>
              <th className="px-1 py-2 text-center" colSpan={2}>
                manufacturer
              </th>
              <th className="px-1 py-2 text-center" colSpan={2}>
                Type
              </th>
              <th className="px-1 py-2 text-center" colSpan={4}>
                Department
              </th>
              <th className="px-1 py-2 text-center" colSpan={2}>
                Status
              </th>
              <th className="px-1 py-2 text-center" colSpan={1}>
                action
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {/* Patients */}
          {modalities?.map((item: Modality, index: number) => (
            <React.Fragment key={index}>
              <tr
                key={index}
                className={`overflow-hidden text-xs h-11 ${
                  headTableforDevices.isKey === item.id ? "bg-gray-200" : ""
                }`}
                onMouseMove={() => forcusOnPatients(item.id || "")}
              >
                <td className="border px-4 py-2 " colSpan={1}>
                  <div className="flex flex-row justify-between">
                    <p>{index + 1}</p>
                  </div>
                </td>
                <td className="border px-4 py-2" colSpan={2}>
                  {item.model}
                </td>
                <td className="border px-4 py-2" colSpan={2}>
                  {item.manufacturer}
                </td>
                <td className="border px-4 py-2" colSpan={2}>
                  {item.type}
                </td>
                <td className="border px-4 py-2" colSpan={4}>
                  {item.department?.name} - {item.department?.location}
                </td>
                <td className="border px-4 py-2 truncate " colSpan={2}>
                  {item.status === "Active" ? (
                   <div className="inline-block  h-2 w-2 bg-green-500 rounded-full shadow-blue-500"></div>
                  ) : (
                    <div className="inline-block  h-2 w-2 bg-red-500 rounded-full shadow-blue-500"></div>
                  )}{" "}
                  {item.status}
                </td>
                <td
                  className="cursor-pointer border px-4 py-2 z-20 "
                  colSpan={1}
                >
                  <DevicesAction devices={item} />
                </td>
              </tr>
            </React.Fragment>
          ))}
          {modalities?.length === 0 && (
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
