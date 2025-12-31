import React, { useEffect, useState } from "react";
import type { OrderResponse } from "../../../../types/order";
import orderApis from "../../../../apis/orderApis";
import PatientListAction from "./PatientListAction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { CircleArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

type OrdersProps = {
  patientName?: string;
  priority?: string;
  orderCode?: string;
  dateCreated?: string;
  getOrdersCount: (count: number) => void;
};

export default function OrdersRender({
  patientName,
  priority,
  orderCode,
  dateCreated,
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
  console.log("Rendered OrdersRender",  dateCreated);
  useEffect(() => {
    const fetchOrder = async () => {
      const res = await orderApis.findQueueByStatusOrder("SCHEDULED");
      const filter = res.result;
      setOrder(filter as unknown as OrderResponse[]);
    };
    fetchOrder();
  }, []);
  console.log("OrdersRender useEffect dateCreated", dateCreated);
  useEffect(() => {
    orderApis.findQueueByStatusOrder("SCHEDULED").then((res) => {
      let filtered = res.result;
      if (patientName?.trim()) {
        const q = patientName.toLocaleLowerCase();
        filtered = filtered.filter((patient: OrderResponse) =>
          patient.patientName?.toLocaleLowerCase().includes(q)
        );
      }

      if (priority?.trim()) {
        const q = priority.toUpperCase();
        filtered = filtered.filter((patient: OrderResponse) =>
          patient?.priority?.toUpperCase().includes(q)
        );
      }
      if (orderCode?.trim()) {
        const q = orderCode.toUpperCase();
        filtered = filtered.filter((patient: OrderResponse) =>
          patient?.orderCode?.toUpperCase().includes(q)
        );
      }
      if (dateCreated?.trim()) {
        filtered = filtered.filter((patient: OrderResponse) =>
          patient?.createdAt?.includes(dateCreated)
        );
      }
      setOrder(filtered);
    });
  }, [patientName, priority, orderCode, dateCreated]);
  if (order && typeof getOrdersCount === "function") {
    getOrdersCount(order.length);
  }
  return (
    <div className="container overflow-x-auto mx-auto w-full flex justify-center">
      <table className="w-full table-fixed">
        <thead className="bg-bg-secondary text-white overflow-x-scroll">
          {headTableforPatients.isHeadTitle && (
            <tr className=" overflow-hidden text-xs">
              <th className="px-1 py-2 text-center" colSpan={1}>
                No.
              </th>
              <th className="px-1 py-2 text-center" colSpan={4}>
                Patient Name
              </th>
              <th
                className="hidden lg:table-cell px-1 py-2 text-center"
                colSpan={3}
              >
                order Code
              </th>
              <th
                className="hidden lg:table-cell px-1 py-2 text-center"
                colSpan={3}
              >
                Date Received
              </th>
              <th
                className="hidden lg:table-cell px-1 py-2 text-center"
                colSpan={3}
              >
                Patient ID
              </th>
              <th
                className="hidden lg:table-cell px-1 py-2 text-center"
                colSpan={1}
              >
                Age
              </th>
              <th className="px-1 py-2 text-center" colSpan={2}>
                status
              </th>
              <th
                className="hidden lg:table-cell px-1 py-2 text-center"
                colSpan={5}
              >
                Services
              </th>
              <th className="px-1 py-2 text-center" colSpan={1}>
                Priority
              </th>
              <th className="px-1 py-2 text-center" colSpan={1}></th>
            </tr>
          )}
        </thead>

        <tbody>
          {/* Patients */}
          {order?.map((item: OrderResponse, index: number) => (
            <React.Fragment>
              <Dialog>
                <DialogTrigger asChild>
                  <tr
                    key={index}
                    className={`overflow-hidden text-xs h-11 cursor-pointer ${
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
                    <td
                      className="text-blue-700 font-medium border px-4 py-2 truncate"
                      colSpan={4}
                    >
                      {item.patientName}
                    </td>
                    <td
                      className="hidden lg:table-cell border px-4 py-2"
                      colSpan={3}
                    >
                      {item.orderCode}
                    </td>
                    <td
                      className="hidden lg:table-cell border px-4 py-2"
                      colSpan={3}
                    >
                      {dayjs(item.createdAt).format("YYYY-MM-DD HH:mm")}
                    </td>
                    <td
                      className="hidden lg:table-cell border px-4 py-2"
                      colSpan={3}
                    >
                      {item.patientId}
                    </td>
                    <td
                      className="hidden lg:table-cell border px-4 py-2"
                      colSpan={1}
                    >
                      {item.patient?.age}
                    </td>
                    <td className="border px-4 py-2" colSpan={2}>
                      {item.status}
                    </td>
                    <td
                      className="hidden lg:table-cell text-blue-700 font-medium border px-4 py-2 truncate"
                      colSpan={5}
                    >
                      {item.serviceItems
                        .map((service) => service.serviceName)
                        .join(", ")}
                    </td>
                    <td className="border px-4 py-2 text-center" colSpan={1}>
                      {item.priority == "ROUTINE" ? (
                        <div className="inline-block  h-4 w-4 bg-blue-500 rounded-full shadow-blue-500"></div>
                      ) : (
                        <div className="inline-block  h-4 w-4 bg-red-500 rounded-full shadow-red-500"></div>
                      )}
                    </td>
                    <td
                      className="cursor-pointer border px-4 py-2 z-20"
                      colSpan={1}
                    >
                      <PatientListAction order={item} />
                    </td>
                  </tr>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]  bg-white">
                  <DialogHeader>
                    <DialogTitle>Study Details</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 ">
                    <div className="grid grid-cols-1 gap-2 w-full h-full">
                      <p>Patient ID:</p>
                      <p>Patient Name:</p>
                      <p>Birth Year:</p>
                      <p>Address:</p>
                      <p className="py-2"></p>
                      <p>Order Code:</p>
                      <p>Date Received:</p>
                      <p>Device:</p>
                      <p>Service Code:</p>
                      <p>Service Name:</p>
                      <p></p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 w-full h-full">
                      <p>{item.patientId}</p>
                      <p>{item.patientName}</p>
                      <p>{item.patientBirthday}</p>
                      <p>{item.patient?.address}</p>
                      <p className="py-2"></p>
                      <p>{item.orderCode}</p>
                      <p>{new Date(item.createdAt).toLocaleString("vi-VN")}</p>
                      <p>{item.serviceItems?.[0]?.modality?.model}</p>
                      <p>{item.serviceItems?.[0]?.serviceCode}</p>
                      <p>{item.serviceItems?.[0]?.serviceName}</p>
                    </div>
                  </div>
                  <div className="cursor-pointer items-center text-blue-600 hover:text-blue-800">
                    <Link
                      to={`/admin/worklist/${item.orderId}`}
                      className="gap-2 flex flex-row justify-end mt-4"
                    >
                      <p>Proceed to Scan</p>
                      <CircleArrowRight />
                    </Link>
                  </div>
                </DialogContent>
              </Dialog>
            </React.Fragment>
          ))}
          {order?.length === 0 && (
            <tr className="block md:table-row">
              <td
                colSpan={24}
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
