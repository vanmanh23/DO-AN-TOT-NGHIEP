import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import orderApis from "../../../../apis/orderApis";
import type {
  OrderResponse,
  PacsUidResponse,
  ReportResult,
} from "../../../../types/order";
import { Camera, Eye } from "lucide-react";
import { uploadDicomImg } from "../../../../apis/dicomApis";
import { toast } from "sonner";
import removeAccents from "remove-accents";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store/store";
import {
  setSeriesInstanceUID,
  setStudyInstanceUID,
} from "../../../../features/pacsInstanceUID";

export default function Component() {
  const [orderDetail, setOrderDetail] = useState<OrderResponse>();
  const [showModal, setShowModal] = useState<PacsUidResponse>();
  const [diagnose, setDiagnose] = useState<ReportResult>({
    description: "",
    conclusion: "",
    suggestion: "",
    orderId: "",
    studyUID: "",
    seriesUID: "",
    instances: "",
  });
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const findByOrderId = async () => {
      const res = await orderApis.getById(id as string);
      setOrderDetail(res.result);
    };
    findByOrderId();
  }, []);
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const removeAccent = removeAccents(
      orderDetail?.patient?.patientName as string
    );
    try {
      const result = await uploadDicomImg(
        e,
        removeAccent,
        orderDetail?.patient?.gender as string
      );
      toast.success("Upload Dicom images successfully!", {
        duration: 2000,
        position: "bottom-right",
        richColors: true,
      });
      setShowModal(result?.result[0]);
      dispatch(setStudyInstanceUID(result?.result[0].studyInstanceUID));
      dispatch(setSeriesInstanceUID(result?.result[0].seriesInstanceUID));
      // window.location.reload();
    } catch (error) {
      toast.error(`${error.response.data}`, {
        duration: 2000,
        position: "bottom-right",
        richColors: true,
      });
    }
  };
  const goToDetailImage = () => {
    localStorage.setItem(
      "studyInstanceUID",
      showModal?.studyInstanceUID as string
    );
    localStorage.setItem(
      "seriesInstanceUID",
      showModal?.seriesInstanceUID as string
    );
    window.open(`/dicom-viewer`, "_blank");
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDiagnose({ ...diagnose, [name]: value });
  };
  const handleClose = async () => {
    try {
      // await orderApis.generateReport
      setDiagnose({
        ...diagnose,
        orderId: orderDetail?.orderId as string,
        studyUID: showModal?.studyInstanceUID as string,
        seriesUID: showModal?.seriesInstanceUID as string,
        instances: showModal?.instanceUID as string,
      });

      await orderApis.generateReport(diagnose);

      await orderApis.ChangeStatus({
        order_id: orderDetail?.orderId as string,
        new_status: "COMPLETED",
      });

      toast.success("Successful completion of nomination form!", {
        duration: 2000,
        richColors: true,
      });
      window.location.reload();
    } catch (error) {
      toast.error("Failed to complete the nomination form!", {
        duration: 2000,
        richColors: true,
      });
      console.log(error);
    }
  };
  console.log("diagnose", diagnose);
  return (
    <div className=" bg-gray-100 px-4 py-1 text-sm">
      <div className="bg-white shadow rounded p-4 border h-full flex flex-col">
        <div className="flex items-center  border-b pb-2 mb-3">
          <h1 className="font-semibold text-lg">Bệnh nhân thực hiện</h1>
        </div>
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
                <input
                  value={orderDetail?.doctor.fullName}
                  className="w-full border p-1 rounded mt-1"
                />
              </div>
              <div>
                <label className="font-medium">KTV/ĐD:</label>
                <input className="w-full border p-1 rounded mt-1" />
              </div>
              <div>
                <label className="font-medium">Dịch vụ:</label>
                <p>{orderDetail?.serviceItems?.[0]?.serviceName}</p>
              </div>
            </div>

            <div>
              <label className="font-medium">Chẩn đoán:</label>
              <textarea
                name="suggestion"
                value={diagnose.suggestion}
                onChange={handleChangeInput}
                className="w-full border outline-blue-400 p-2 rounded h-20 mt-1"
              ></textarea>
            </div>

            <div className="mt-3">
              <label className="font-medium">Mô tả:</label>
              <textarea
                name="description"
                value={diagnose.description}
                onChange={handleChangeInput}
                className="w-full border outline-blue-400 p-2 rounded h-32 mt-1"
              ></textarea>
            </div>

            <div className="mt-3">
              <label className="font-medium">Kết luận:</label>
              <textarea
                name="conclusion"
                value={diagnose.conclusion}
                onChange={handleChangeInput}
                className="w-full border outline-blue-400 p-2 rounded h-20 mt-1"
              ></textarea>
            </div>
          </div>
          <div className="w-80 border rounded p-3 bg-white flex flex-col">
            <div className="h-48 border rounded bg-gray-200 mb-3"></div>

            <h3 className="font-medium mb-2">Danh sách ảnh đã chụp</h3>
            {showModal && (
              <div className="flex-1 border rounded mb-3">
                <img
                  src={`http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs/studies/${showModal?.studyInstanceUID}/series/${showModal?.seriesInstanceUID}/instances/${showModal?.instanceUID}/rendered`}
                  alt="dicom"
                  className="w-full rounded border"
                />
              </div>
            )}

            <h3 className="font-medium mb-2">Danh sách video</h3>
            <div className="flex-1 border rounded"></div>
            <div className="flex flex-row justify-around mt-3">
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept=".dcm,image/*"
                  onChange={handleUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="px-2 py-1 border rounded mt-3 flex flex-row justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                >
                  <Camera />
                  <p>Chup anh</p>
                </label>
              </div>
              <div
                onClick={goToDetailImage}
                className="px-2 py-1 border rounded mt-3 flex flex-row justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 cursor-pointer"
              >
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
          <button className="px-4 py-2 bg-gray-600 text-white rounded">
            Thoát
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded">
            In
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Kết thúc
          </button>
        </div>
      </div>
    </div>
  );
}
