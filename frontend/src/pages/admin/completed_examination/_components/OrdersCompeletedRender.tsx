import React, { useEffect, useState } from "react";
import type { OrderResponse } from "../../../../types/order";
import orderApis from "../../../../apis/orderApis";
import ReportAction from "./ReportAction";
import { MonitorPlay } from "lucide-react";
import CheckoutCard from "./CheckoutCard";
import InvoiceCard from "./InvoiceCard";
import { renderSkeletonRows } from "../../../../components/renderSkeletonRows";

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
    const fetchOrder = async () => {
      setLoading(true);
      const res = await orderApis.getByStatus("COMPLETED");
      setOrder(res.result as unknown as OrderResponse[]);
      setLoading(false);
    };
    fetchOrder();
  }, []);

  useEffect(() => {
    if (!loading) {
      orderApis.getByStatus("COMPLETED").then((res) => {
        let filtered = res.result as unknown as OrderResponse[];
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
      });
    }
  }, [patientName, patient_type, order_id]);

  if (order && typeof getOrdersCount === "function") {
    getOrdersCount(order.length);
  }

  const goToDetailImage = (
    studyInstanceUID: string,
    seriesInstanceUID: string
  ) => {
    localStorage.setItem("studyInstanceUID", studyInstanceUID as string);
    localStorage.setItem("seriesInstanceUID", seriesInstanceUID as string);
    window.open(`/dicom-viewer`, "_blank");
  };

  return (
    <div className="container mx-auto w-full px-2 md:px-0">
      {/* Thay đổi class table để w-full */}
      <table className="w-full text-sm text-left">
        {/* Thead: Ẩn trên mobile (hidden), hiện trên md trở lên (md:table-header-group) */}
        <thead className="hidden md:table-header-group bg-bg-secondary text-white overflow-hidden">
          {headTableforPatients.isHeadTitle && (
            <tr className="overflow-hidden text-xs">
              <th className="px-2 py-3 text-center">STT</th>
              <th className="px-2 py-3 text-left">Patient Name</th>
              <th className="px-2 py-3 text-left">Order ID</th>
              <th className="px-2 py-3 text-left">Bác sĩ chỉ định</th>
              <th className="px-2 py-3 text-left">Patient ID</th>
              <th className="px-2 py-3 text-center">Study</th>
              <th className="px-2 py-3 text-left">Dịch vụ</th>
              <th className="px-2 py-3 text-center">Báo cáo</th>
              <th className="px-2 py-3 text-center">Thanh toán</th>
            </tr>
          )}
        </thead>

        <tbody className="block md:table-row-group">
          {loading && renderSkeletonRows({counts: [1, 1 ,1 ,1 ,1 ,1 ,1 ,1 ,1]})}
          {!loading &&
            order?.map((item: OrderResponse, index: number) => (
              <tr
                key={index}
                className={`
                border-b border-gray-200 
                /* Mobile styles: Block, margin bottom, border, rounded */
                block mb-4 md:mb-0 md:table-row rounded-lg border shadow-sm md:shadow-none md:border-0
                ${
                  headTableforPatients.isKey === item.orderId
                    ? "bg-gray-100 md:bg-gray-200"
                    : "bg-white"
                }
              `}
                onMouseMove={() => forcusOnPatients(item.orderId)}
              >
                {/* STT */}
                <td className="p-3 md:border md:text-center block md:table-cell flex justify-between items-center border-b md:border-b-0 last:border-b-0">
                  <span className="font-bold text-gray-600 md:hidden">
                    STT:
                  </span>
                  <span className="font-semibold">{index + 1}</span>
                </td>

                {/* Patient Name */}
                <td className="p-3 md:border block md:table-cell flex justify-between items-center border-b md:border-b-0">
                  <span className="font-bold text-gray-600 md:hidden">
                    Tên BN:
                  </span>
                  <span className="text-blue-700 font-medium">
                    {item.patientName}
                  </span>
                </td>

                {/* Order ID */}
                <td className="p-3 md:border block md:table-cell flex justify-between items-center border-b md:border-b-0">
                  <span className="font-bold text-gray-600 md:hidden">
                    Order ID:
                  </span>
                  <span className="truncate max-w-[150px]">{item.orderId}</span>
                </td>

                {/* Doctor */}
                <td className="p-3 md:border block md:table-cell flex justify-between items-center border-b md:border-b-0">
                  <span className="font-bold text-gray-600 md:hidden">
                    Bác sĩ:
                  </span>
                  <span>{item.doctor.fullName}</span>
                </td>

                {/* Patient ID */}
                <td className="p-3 md:border block md:table-cell flex justify-between items-center border-b md:border-b-0">
                  <span className="font-bold text-gray-600 md:hidden">
                    Mã BN:
                  </span>
                  <span>{item.patientId}</span>
                </td>

                {/* Study - Icon */}
                <td className="p-3 md:border md:text-center block md:table-cell flex justify-between items-center border-b md:border-b-0">
                  <span className="font-bold text-gray-600 md:hidden">
                    Xem ảnh:
                  </span>
                  <MonitorPlay
                    onClick={() =>
                      goToDetailImage(
                        item.study.studyInstanceUID as string,
                        item.study.seriesInstanceUID as string
                      )
                    }
                    className="text-blue-600 cursor-pointer md:mx-auto w-6 h-6"
                  />
                </td>

                {/* Dịch vụ */}
                <td className="p-3 md:border block md:table-cell border-b md:border-b-0">
                  <span className="font-bold text-gray-600 block md:hidden mb-1">
                    Dịch vụ:
                  </span>
                  <div className="break-words text-sm">
                    {item.serviceItems
                      .map((service) => service.serviceName)
                      .join(", ")}
                  </div>
                </td>

                {/* Báo cáo */}
                <td className="p-3 md:border md:text-center block md:table-cell flex justify-between items-center border-b md:border-b-0">
                  <span className="font-bold text-gray-600 md:hidden">
                    Báo cáo:
                  </span>
                  <div className="z-20">
                    <ReportAction order={item} />
                  </div>
                </td>

                {/* Thanh toán */}
                <td className="p-3 md:border md:text-center block md:table-cell border-b md:border-b-0">
                  <span className="font-bold text-gray-600 block md:hidden mb-2 text-left">
                    Thanh toán:
                  </span>
                  <div className="w-full md:w-auto">
                    {item.payment ? (
                      item.payment.status === "PENDING" ? (
                        <CheckoutCard order={item} />
                      ) : (
                        // <span className="text-green-600 font-semibold">Đã thanh toán</span>
                        <InvoiceCard order={item} />
                      )
                    ) : (
                      "N/A"
                    )}
                  </div>
                </td>
              </tr>
            ))}
          {order?.length === 0 && (
            <tr className="block md:table-row">
              <td
                colSpan={9}
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
