import React, { useEffect, useState } from "react";
import type { OrderResponse } from "../../../../types/order";
import orderApis from "../../../../apis/orderApis";
import PatientListAction from "./PatientListAction";

type OrdersProps = {
  patientName?: string;
  patient_type?: string;
  order_id?: string;
  getOrdersCount: (count: number) => void;
};

export default function OrdersCompeletedRender({
  patientName,
  patient_type,
  order_id,
  getOrdersCount,
}: OrdersProps) {
  const [order, setOrder] = useState<OrderResponse[]>();
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
      const res = await orderApis.getByStatus("COMPLETED");
      setOrder(res.result as unknown as OrderResponse[]);
    };
    fetchOrder();
  }, []);
  useEffect(() => {
    orderApis.getByStatus("COMPLETED").then((res) => {
      let filtered = res.result as unknown as OrderResponse[];
      if (patientName?.trim()) {
        const q = patientName.toLocaleLowerCase();
        filtered = filtered.filter((patient: OrderResponse) =>
          patient.patientName?.toLocaleLowerCase().includes(q)
        );
      }

      // if (patient_type?.trim()) {
      //   const q = patient_type.toUpperCase();
      //   filtered = filtered.filter((patient: OrderResponse) =>
      //     patient?.?.toUpperCase().includes(q)
      //   );
      // }
      if (order_id?.trim()) {
        const q = order_id.toUpperCase();
        filtered = filtered.filter((patient: OrderResponse) =>
          patient?.orderId?.toUpperCase().includes(q)
        );
      }

      setOrder(filtered);
    });
  }, [patientName, patient_type, order_id]);
  if (order && typeof getOrdersCount === "function") {
    getOrdersCount(order.length);
  }
  console.log("order", order);
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
                order ID
              </th>
              <th className="px-1 py-2 text-center" colSpan={2}>
                Bác sĩ chỉ định
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
                dịch vụ
              </th>
              <th className="px-1 py-2 text-center" colSpan={2}>
                báo cáo
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {/* Patients */}
          {order?.map((item: OrderResponse, index: number) => (
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
                <td className="border px-4 py-2" colSpan={3}>
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
                <td className="border px-4 py-2" colSpan={5}>
                  {item.serviceItems
                    .map((service) => service.serviceName)
                    .join(", ")}
                </td>
                <td
                  className="cursor-pointer border px-4 py-2 z-20"
                  colSpan={2}
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
