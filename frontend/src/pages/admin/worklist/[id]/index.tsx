import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import orderApis from "../../../../apis/orderApis";
import type { OrderResponse } from "../../../../types/order";
import { Camera, Eye } from "lucide-react";

export default function Component() {
  const [orderDetail, setOrderDetail] = useState<OrderResponse>();
  const { id } = useParams();
  console.log(id); // Lấy được orderId từ URL
  useEffect(() => {
    const findByOrderId = async () => {
      const res = await orderApis.getById(id as string);
      setOrderDetail(res.result);
    };
    findByOrderId();
  }, []);
  console.log("orderDetail", orderDetail?.serviceItems.at(0)?.modality.model);
  return (
    <div className=" bg-gray-100 px-4 py-1 text-sm">
      <div className="bg-white shadow rounded p-4 border h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center  border-b pb-2 mb-3">
          <h1 className="font-semibold text-lg">Bệnh nhân thực hiện</h1>
        </div>

        {/* Patient Info */}
        <div className="grid grid-cols-4 gap-x-2 border p-3 rounded bg-gray-50">
          <div className="col-span-1">
            <label className="font-medium">Mã BN:</label>
            <input
              type="text"
              value={orderDetail?.patient?.id}
              className="w-full border p-1 rounded mt-1"
            />
          </div>
          <div className="col-span-1">
            <label className="font-medium">Họ và tên:</label>
            <input
              type="text"
              value={orderDetail?.patient?.patientName}
              className="w-full border p-1 rounded mt-1"
            />
          </div>
          <div className="col-span-1">
            <label className="font-medium">Năm sinh:</label>
            <input
              type="date"
              value={orderDetail?.patient?.patientBirthDate}
              className="w-full border p-1 rounded mt-1"
            />
          </div>
          <div className="col-span-1">
            <label className="font-medium">Giới tính:</label>
            <select
              value={orderDetail?.patient?.gender}
              className="w-full border p-1 rounded mt-1"
            >
              <option>Nam</option>
              <option>Nữ</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="font-medium">Địa chỉ:</label>
            <input
              type="text"
              value={orderDetail?.patient?.address}
              className="w-full border p-1 rounded mt-1"
            />
          </div>
          <div className="col-span-2">
            <label className="font-medium">SĐT:</label>
            <input
              type="text"
              value={orderDetail?.patient?.phoneNumber}
              className="w-full border p-1 rounded mt-1"
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 gap-4 mt-4 overflow-hidden">
          {/* Left side */}
          <div className="flex-1 border rounded p-3 overflow-y-auto bg-white">
            <h2 className="font-medium mb-2">Kết quả</h2>

            <div className="grid grid-cols-4 gap-4 mb-3">
              <div>
                <label className="font-medium">Ngày:</label>
                <input
                  type="datetime-local"
                  value={new Date(
                    Date.now() - new Date().getTimezoneOffset() * 60000
                  )
                    .toISOString()
                    .slice(0, 16)}
                  className="w-full border p-1 rounded mt-1"
                />
              </div>
              <div>
                <label className="font-medium">Máy:</label>
                <select
                  value={orderDetail?.patientName ?? ""}
                  className="w-full border p-1 rounded mt-1"
                >
                  <option value="">
                    {orderDetail?.serviceItems?.[0]?.modality?.model}
                  </option>
                </select>
              </div>
              <div>
                <label className="font-medium">Bác sĩ:</label>
                <input className="w-full border p-1 rounded mt-1" />
              </div>
              <div>
                <label className="font-medium">KTV/ĐD:</label>
                <input className="w-full border p-1 rounded mt-1" />
              </div>
            </div>

            <div>
              <label className="font-medium">Chẩn đoán:</label>
              <textarea className="w-full border p-2 rounded h-20 mt-1"></textarea>
            </div>

            <div className="mt-3">
              <label className="font-medium">Mô tả:</label>
              <textarea className="w-full border p-2 rounded h-32 mt-1"></textarea>
            </div>

            <div className="mt-3">
              <label className="font-medium">Kết luận:</label>
              <textarea className="w-full border p-2 rounded h-20 mt-1"></textarea>
            </div>
          </div>

          {/* Right side */}
          <div className="w-80 border rounded p-3 bg-white flex flex-col">
            <div className="h-48 border rounded bg-gray-200 mb-3"></div>

            <h3 className="font-medium mb-2">Danh sách ảnh đã chụp</h3>
            <div className="flex-1 border rounded mb-3"></div>

            <h3 className="font-medium mb-2">Danh sách video</h3>
            <div className="flex-1 border rounded"></div>
            <div className="flex flex-row justify-around mt-3">
                <div className="px-2 py-1 border rounded mt-3 flex flex-row justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 cursor-pointer">
                    <Camera />
                    <p>Chup anh</p>
                </div>
                <div className="px-2 py-1 border rounded mt-3 flex flex-row justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 cursor-pointer">
                    <Eye />
                    <p>View</p>
                </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-4 border-t pt-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded">
            Mới
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Mô tả
          </button>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded">
            Sinh thiết
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded">
            Thoát
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded">
            In
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded">
            Kết thúc
          </button>
        </div>
      </div>
    </div>
  );
}
