import React, { useEffect, useState } from "react";
import type { OrderResponse } from "../../../../types/order";
import orderApis from "../../../../apis/orderApis";
import PatientListAction from "./PatientListAction";
import { renderSkeletonRows } from "../../../../components/renderSkeletonRows";
import dayjs from "dayjs";

type OrdersProps = {
  patientName?: string;
  dateCreated?: string;
  order_id?: string;
  getOrdersCount: (count: number) => void;
};

export default function OrdersRender({
  patientName,
  dateCreated,
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
console.log("Rendered OrdersRender", patientName, dateCreated, order_id);
  // Fetch all patients once on mount
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const res = await orderApis.findQueueByStatusOrder("SCHEDULED");
      const filter = res.result;
      setOrder(filter as unknown as OrderResponse[]);
      setLoading(false);
    };
    fetchOrder();
  }, []);
  useEffect(() => {
    orderApis.findQueueByStatusOrder("SCHEDULED").then((res) => {
      setLoading(true);
      let filtered = res.result;
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
      if (dateCreated?.trim()) {
        filtered = filtered.filter((patient: OrderResponse) =>
          patient?.createdAt?.includes(dateCreated)
        );
      }

      setOrder(filtered);
      setLoading(false);
    });
  }, [patientName, dateCreated, order_id]);
  if (order && typeof getOrdersCount === "function") {
    getOrdersCount(order.length);
  }

  return (
    <div className="container overflow-x-auto mx-auto w-full flex justify-center">
      <table className="w-full  table-fixed">
        <thead className="bg-bg-secondary text-white ">
          {headTableforPatients.isHeadTitle && (
            <tr className="text-xs">
              <th className="px-1 py-2 text-center" colSpan={1}>
                No.
              </th>
              <th className="px-1 py-2 text-center" colSpan={3}>
                Patient Name
              </th>
              <th className="hidden md:table-cell px-1 py-2 text-center" colSpan={3}>
                order Code
              </th>
              <th className="hidden md:table-cell px-1 py-2 text-center" colSpan={4}>
                Date Received
              </th>
              <th className="hidden lg:table-cell px-1 py-2 text-center" colSpan={4}>
                Patient ID
              </th>
              <th className="hidden lg:table-cell px-1 py-2 text-center" colSpan={2}>
                BirthDate
              </th>
              <th className="px-1 py-2 text-center" colSpan={3}>
                status
              </th>
              <th className="hidden lg:table-cell px-1 py-2 text-center" colSpan={5}>
                Services
              </th>
              <th className="px-1 py-2 text-center" colSpan={1}>
                Priority
              </th>
              <th className="px-1 py-2 text-center" colSpan={1}>
                
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {isLoading && renderSkeletonRows({counts: [1, 3, 3, 4, 4, 2, 3, 5, 1, 1]})}
          {!isLoading &&
            order?.map((item: OrderResponse, index: number) => (
              <React.Fragment key={index}>
                <tr
                  key={index}
                  className={`overflow-x-auto text-xs h-11 ${
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
                  <td className="hidden md:table-cell border px-4 py-2 truncate" colSpan={3}>
                    {item.orderCode}
                  </td>
                  <td className="hidden md:table-cell border px-4 py-2" colSpan={4}>
                      {dayjs(item.createdAt).format("YYYY-MM-DD HH:mm")}
                  </td>
                  <td className="hidden lg:table-cell border px-4 py-2" colSpan={4}>
                    {item.patientId}
                  </td>
                  <td className="hidden lg:table-cell border px-4 py-2" colSpan={2}>
                    {new Date(item.patientBirthday).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="border px-4 py-2" colSpan={3}>
                    {item.status}
                  </td>
                  <td className="hidden lg:table-cell text-blue-700 font-medium border px-4 py-2" colSpan={5}>
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
             <tr className="block md:table-row">
              <td
                colSpan={27}
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
