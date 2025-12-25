import React, { useEffect, useState } from "react";
import type { ServiceItem } from "../../../../types/order";
import serviceItemsApis from "../../../../apis/serviceItemsApis";
import ServiceItemsAction from "./ServiceItemsAction";
import { renderSkeletonRows } from "../../../../components/renderSkeletonRows";

type OrdersProps = {
  serviceName?: string;
  serviceCode?: string;
  modality?: string;
  getServiceItemsCount: (count: number) => void;
};

export default function ServiceItemsRender({
  serviceName,
  serviceCode,
  modality,
  getServiceItemsCount,
}: OrdersProps) {
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>();
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

  // Fetch all patients once on mount
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const res = await serviceItemsApis.getAll();
      setServiceItems(res.result as unknown as ServiceItem[]);
      setLoading(false);
    };
    fetchOrder();
  }, []);
  useEffect(() => {
    serviceItemsApis.getAll().then((res) => {
      setLoading(true);
      let filtered = res.result as unknown as ServiceItem[];
      if (serviceName?.trim()) {
        const q = serviceName.toLocaleLowerCase();
        filtered = filtered.filter((serviceItem: ServiceItem) =>
          serviceItem.serviceName?.toLocaleLowerCase().includes(q)
        );
      }
      if (serviceCode?.trim()) {
        const q = serviceCode.toUpperCase();
        filtered = filtered.filter((serviceItem: ServiceItem) =>
          serviceItem?.serviceCode?.toUpperCase().includes(q)
        );
      }
      if (modality?.trim()) {
        const q = modality.toUpperCase();
        filtered = filtered.filter((serviceItem: ServiceItem) =>
          serviceItem?.modality.type.toUpperCase().includes(q)
        );
      }
      setServiceItems(filtered);
      setLoading(false);
    });
  }, [serviceCode, serviceName, modality]);
  if (serviceItems && typeof getServiceItemsCount === "function") {
    getServiceItemsCount(serviceItems.length);
  }
  return (
    <div className="container overflow-x-auto mx-auto w-full flex justify-center">
      <table className="w-full min-w-[600px] table-fixed">
        <thead className="bg-bg-secondary text-white overflow-hidden">
          {headTableforPatients.isHeadTitle && (
            <tr className=" overflow-hidden text-xs">
              <th className="px-1 py-2 text-center" colSpan={1}>
                STT
              </th>
              <th className="px-1 py-2 text-center" colSpan={4}>
                service Name
              </th>
              <th className="px-1 py-2 text-center" colSpan={3}>
                service Code
              </th>
              <th className="px-1 py-2 text-center" colSpan={3}>
                Modality
              </th>
              <th className="px-1 py-2 text-center" colSpan={2}>
                Unit Price
              </th>
              <th className="px-1 py-2 text-center" colSpan={1}>
                action
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {loading && renderSkeletonRows({ counts: [1, 4, 3, 3, 2, 1] })}
          {serviceItems?.map((item: ServiceItem, index: number) => (
            <React.Fragment key={index}>
              <tr
                key={index}
                className={`overflow-hidden text-xs h-11 ${
                  headTableforPatients.isKey === item.id
                    ? "bg-gray-200"
                    : ""
                }`}
                onMouseMove={() => forcusOnPatients(item.id)}
              >
                <td className="border px-4 py-2 " colSpan={1}>
                  <div className="flex flex-row justify-between">
                    <p>{index + 1}</p>
                  </div>
                </td>
                <td className="text-blue-700 font-medium border px-4 py-2" colSpan={4}>
                  {item.serviceName}
                </td>
                <td className="border px-4 py-2 truncate" colSpan={3}>
                  {item.serviceCode}
                </td>
                <td className="border px-4 py-2" colSpan={3}>
                  {item.modality.type}
                </td>
                <td className="border px-4 py-2" colSpan={2}>
                  {item.unitPrice}
                </td>
                <td
                  className="cursor-pointer border px-4 py-2 z-20"
                  colSpan={1}
                >
                  <ServiceItemsAction serviceItems={item} />
                </td>
              </tr>
            </React.Fragment>
          ))}
          {serviceItems?.length === 0 && (
             <tr className="block md:table-row">
              <td
                colSpan={14}
                className="p-4 text-center border text-gray-500 block md:table-cell"
              >
                Not found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
