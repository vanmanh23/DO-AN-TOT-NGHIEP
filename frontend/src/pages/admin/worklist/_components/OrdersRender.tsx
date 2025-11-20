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
      const res = await orderApis.getAll();
      setOrder(res.result.content as unknown as OrderResponse[]);
    };
    fetchOrder();
  }, []);
  useEffect(() => {
    orderApis.getAll().then((res) => {
      let filtered = res.result.content as unknown as OrderResponse[];
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
                ngày nhận phiếu
              </th>
              <th className="px-1 py-2 text-center" colSpan={5}>
                Patient ID
              </th>
              <th className="px-1 py-2 text-center" colSpan={2}>
                BirthDate
              </th>
              <th className="px-1 py-2 text-center" colSpan={2}>
                status
              </th>
              <th className="px-1 py-2 text-center" colSpan={5}>
                dịch vụ
              </th>
              <th className="px-1 py-2 text-center" colSpan={1}>
                ưu tiên
              </th>
              <th className="px-1 py-2 text-center" colSpan={1}>
                action
              </th>
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
                    <td className="border px-4 py-2" colSpan={3}>
                      {item.patientName}
                    </td>
                    <td className="border px-4 py-2" colSpan={5}>
                      {item.orderId}
                    </td>
                    <td className="border px-4 py-2" colSpan={2}>
                      {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="border px-4 py-2" colSpan={5}>
                      {item.patientId}
                    </td>
                    <td className="border px-4 py-2" colSpan={2}>
                      {new Date(item.patientBirthday).toLocaleDateString(
                        "vi-VN"
                      )}
                    </td>
                    <td className="border px-4 py-2" colSpan={2}>
                      {item.status}
                    </td>
                    <td className="border px-4 py-2" colSpan={5}>
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
                    <DialogTitle>Thông tin chi tiết ca chụp</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2">
                      <div className="grid grid-cols-1 w-full h-full">
                        <p>Ma BN</p>
                        <p>Ten BN</p>
                        <p>Nam sinh</p>
                        <p>Dia chi</p>
                        <p></p>
                        <p>ma phieu</p>
                        <p>ngay nhan phieu</p>
                        <p>thiet bi</p>
                        <p>ma dich vu</p>
                        <p>dich vu</p>
                        <p></p>
                      </div>
                      <div className="grid grid-cols-1 w-full h-full">
                        <p>{item.patientId}</p>
                        <p>{item.patientName}</p>
                        <p>{item.patientBirthday}</p>
                        <p>{item.patient?.address}</p>
                        <p></p>
                        <p>{item.serviceItems?.[0]?.id}</p>
                        <p>{new Date(item.createdAt).toLocaleString("vi-VN")}</p>
                        <p>{item.serviceItems?.[0]?.modality?.model}</p>
                        <p>{item.serviceItems?.[0]?.serviceCode}</p>
                        <p>{item.serviceItems?.[0]?.serviceName}</p>
                      </div>
                  </div>
                </DialogContent>
                </Dialog>
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
