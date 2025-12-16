import React, { useEffect, useState } from "react";
import type { OrderResponse } from "../../../../types/order";
import orderApis from "../../../../apis/orderApis";
import PatientListAction from "./PatientListAction";
import { renderSkeletonRows } from "../../../../components/renderSkeletonRows";

type OrdersProps = {
  patientName?: string;
  patient_type?: string;
  order_id?: string;
  getOrdersCount: (count: number) => void;
};

export default function OrdersRender({
  patientName,
  patient_type,
  order_id,
  getOrdersCount,
}: OrdersProps) {
  const [order, setOrder] = useState<OrderResponse[]>();
  const [isLoading, setLoading] = useState(true);
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
      const res = await orderApis.getAll();
      const filter = res.result.content.filter(
        (item) => item.status !== "COMPLETED"
      );
      setOrder(filter as unknown as OrderResponse[]);
      setLoading(false);
    };
    fetchOrder();
  }, []);
  useEffect(() => {
    orderApis.getAll().then((res) => {
      setLoading(true);
      let filtered = res.result.content.filter(
        (item) => item.status !== "COMPLETED"
      );
      // let filtered = res.result.content as unknown as OrderResponse[];
      if (patientName?.trim()) {
        const q = patientName.toLocaleLowerCase();
        filtered = filtered.filter((patient: OrderResponse) =>
          patient.patientName?.toLocaleLowerCase().includes(q)
        );
      }

      if (order_id?.trim()) {
        const q = order_id.toUpperCase();
        filtered = filtered.filter((patient: OrderResponse) =>
          patient?.orderId?.toUpperCase().includes(q)
        );
      }

      setOrder(filtered);
      setLoading(false);
    });
  }, [patientName, patient_type, order_id]);
  if (order && typeof getOrdersCount === "function") {
    getOrdersCount(order.length);
  }

  return (
    <div className="container overflow-x-auto mx-auto w-full flex justify-center">
      <table className="w-full min-w-[600px] table-fixed">
        <thead className="bg-bg-secondary text-white overflow-hidden">
          {headTableforPatients.isHeadTitle && (
            <tr className=" overflow-hidden text-xs">
              <th className="px-1 py-2 text-center" colSpan={1}>
                No.
              </th>
              <th className="px-1 py-2 text-center" colSpan={3}>
                Patient Name
              </th>
              <th className="px-1 py-2 text-center" colSpan={5}>
                order ID
              </th>
              <th className="px-1 py-2 text-center" colSpan={2}>
                Date Received
              </th>
              <th className="px-1 py-2 text-center" colSpan={4}>
                Patient ID
              </th>
              <th className="px-1 py-2 text-center" colSpan={2}>
                BirthDate
              </th>
              <th className="px-1 py-2 text-center" colSpan={3}>
                status
              </th>
              <th className="px-1 py-2 text-center" colSpan={5}>
                Services
              </th>
              <th className="px-1 py-2 text-center" colSpan={1}>
                Priority
              </th>
              <th className="px-1 py-2 text-center" colSpan={1}>
                action
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {isLoading && renderSkeletonRows({counts: [1, 3, 5, 2, 4, 2, 3, 5, 1, 1]})}
          {!isLoading &&
            order?.map((item: OrderResponse, index: number) => (
              <React.Fragment key={index}>
                <tr
                  key={index}
                  className={`overflow-hidden text-xs h-11 ${
                    headTableforPatients.isKey === item.orderId
                      ? "bg-gray-200"
                      : ""
                  }`}
                  onMouseMove={() => forcusOnPatients(item.orderId)}
                >
                  <td className="border px-4 py-2 " colSpan={1}>
                    <div className="flex flex-row justify-between">
                      <p>{index + 1}</p>
                    </div>
                  </td>
                  <td className="text-blue-700 font-medium border px-4 py-2" colSpan={3}>
                    {item.patientName}
                  </td>
                  <td className="border px-4 py-2 truncate" colSpan={5}>
                    {item.orderId}
                  </td>
                  <td className="border px-4 py-2" colSpan={2}>
                    {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="border px-4 py-2" colSpan={4}>
                    {item.patientId}
                  </td>
                  <td className="border px-4 py-2" colSpan={2}>
                    {new Date(item.patientBirthday).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="border px-4 py-2" colSpan={3}>
                    {item.status}
                  </td>
                  <td className="text-blue-700 font-medium border px-4 py-2" colSpan={5}>
                    {item.serviceItems
                      .map((service) => service.serviceName)
                      .join(", ")}
                  </td>
                  <td className="border px-4 py-2 text-center" colSpan={1}>
                    {item.priority == "ROUTINE" && (
                      <div className="inline-block  h-4 w-4 bg-blue-500 rounded-full shadow-blue-500"></div>
                    )}
                    {item.priority == "URGENT" && (
                      <div className="inline-block  h-4 w-4 bg-red-600 rounded-full shadow-red-600"></div>
                    )}
                  </td>
                  <td
                    className="cursor-pointer border px-4 py-2 z-20"
                    colSpan={1}
                  >
                    <PatientListAction order={item} />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          {order?.length === 0 && (
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
