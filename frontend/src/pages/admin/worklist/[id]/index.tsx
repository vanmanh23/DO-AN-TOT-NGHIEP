import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import orderApis from "../../../../apis/orderApis";
import TextareaAutosize from 'react-textarea-autosize';
import type {
  AIPredict,
  OrderResponse,
  PacsUidResponse,
} from "../../../../types/order";
import { Camera, Eye, Sparkles } from "lucide-react";
import { uploadDicomImg } from "../../../../apis/dicomApis";
import { toast } from "sonner";
import removeAccents from "remove-accents";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store/store";
import {
  setSeriesInstanceUID,
  setStudyInstanceUID,
} from "../../../../features/pacsInstanceUID";
import { z } from "zod";
import { reportSchema } from "../../../../utils/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import paymentApis from "../../../../apis/paymentApis";
import { Spinner } from "../../../../components/ui/spinner";
import AiConsultButton from "../_components/AiConsultButton";
import { getNutriRecommend } from "../../../../apis/AiRecommend";

type ReportFormValues = z.infer<typeof reportSchema>;

export default function Component() {
  const [orderDetail, setOrderDetail] = useState<OrderResponse>();
  const [showModal, setShowModal] = useState<PacsUidResponse>();
  const [isUploading, setIsUploading] = useState(false);
  const [aiProcessing, setAiProcessing] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      suggestion: "",
      description: "",
      conclusion: "",
      nutrirecomend: "",
    },
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
      setIsUploading(true);
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
    } finally {
      setIsUploading(false);
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

  const onSubmit = async (data: ReportFormValues) => {
    try {
      if (showModal) {
        await orderApis.createStudy({
          studyInstanceUID: showModal.studyInstanceUID,
          seriesInstanceUID: showModal.seriesInstanceUID,
          instanceUID: showModal.instanceUID,
          orderId: orderDetail?.orderId as string,
        });
      }

      await orderApis.generateReport({
        description: data.description,
        conclusion: data.conclusion,
        suggestion: data.suggestion || "",
        orderId: orderDetail?.orderId as string,
        studyUID: showModal?.studyInstanceUID || "",
        seriesUID: showModal?.seriesInstanceUID || "",
        instances: showModal?.instanceUID || "",
        aiNutriRecommen: data.nutrirecomend || "",
      });

      await orderApis.ChangeStatus({
        order_id: orderDetail?.orderId as string,
        new_status: "COMPLETED",
      });

      await paymentApis.create({
        status: "PENDING",
        createdAt: new Date().toISOString(),
        paidAt: null,
        method: null,
        orderId: orderDetail?.orderId as string,
        patientId: orderDetail?.patientId as string,
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
  const handleExit = () => {
    navigate("/admin");
  };
  const handleNewOrder = () => {
    navigate("/admin/worklist/");
  };

  const handleNutriRecommend = async () => {
    try {
      setAiProcessing(true);
      const description = watch("description");
      const conclusion = watch("conclusion");
      if (!description || !conclusion) {
        toast.error("Please fill in all fields", {
          duration: 2000,
          richColors: true,
        });
        return;
      }
      const ai_predict: AIPredict = {
        mo_ta: description,
        ket_luan: conclusion,
      };
      const res = await getNutriRecommend(ai_predict);
      const textFormat = formatNutriText(res.result);
      setValue("nutrirecomend", textFormat);
    } catch (error) {
      toast.error("Failed to complete the nomination form!", {
        duration: 2000,
        richColors: true,
      });
      console.log(error);
    } finally {
      setAiProcessing(false);
    }
  };

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
          {/* <div className="flex-1 border rounded p-3 overflow-y-auto bg-white"> */}

          <form
            id="report-form"
            className="flex-1 border rounded p-3 overflow-y-auto bg-white"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="font-medium mb-2">Kết quả</h2>

            <div className="grid grid-cols-4 gap-4 mb-3">
              <div>
                <label className="font-medium">Ngày:</label>
                <input
                  type="datetime-local"
                  readOnly
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
                  disabled
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
                  readOnly
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
                {...register("suggestion")}
                className="w-full border outline-blue-400 p-2 rounded h-20 mt-1 focus:ring-1 focus:ring-blue-500"
                placeholder="Nhập chẩn đoán sơ bộ..."
              ></textarea>
            </div>

            <div className="mt-3">
              <label className="font-medium">
                Mô tả: <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description")}
                className={`w-full border p-2 rounded h-32 mt-1 outline-none ${
                  errors.description
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
                placeholder="Mô tả chi tiết hình ảnh..."
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="mt-3">
              <label className="font-medium">
                Kết luận: <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("conclusion")}
                className={`w-full border p-2 rounded h-20 mt-1 outline-none ${
                  errors.conclusion
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
                placeholder="Kết luận bệnh..."
              ></textarea>
              {errors.conclusion && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.conclusion.message}
                </p>
              )}
            </div>

            <div className="mt-3">
              <label className="font-medium">Đề xuất chế độ dinh dưỡng:</label>
              <TextareaAutosize
                {...register("nutrirecomend")}
                className={`w-full border p-2  h-20 rounded  mt-1 outline-none ${
                  errors.nutrirecomend
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                }`}
              ></TextareaAutosize>
              {errors.nutrirecomend && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.nutrirecomend.message}
                </p>
              )}
            </div>
            <div>
              <AiConsultButton onClick={handleNutriRecommend} isLoading={aiProcessing}/>
            </div>
          </form>

          {/* </div> */}
          <div className="w-80 border rounded p-3 bg-white flex flex-col">
            <div className="h-48 border rounded bg-gray-200 mb-3"></div>

            <h3 className="font-medium mb-2">Danh sách ảnh đã chụp</h3>
            {!showModal && <div className="flex-1"></div>}
            {showModal && (
              <div className="flex-1 border rounded mb-3">
                <img
                  src={`http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs/studies/${showModal?.studyInstanceUID}/series/${showModal?.seriesInstanceUID}/instances/${showModal?.instanceUID}/rendered`}
                  alt="dicom"
                  className="w-full rounded border"
                />
              </div>
            )}

            {/* <h3 className="font-medium mb-2">Danh sách video</h3>
            <div className="flex-1 border rounded"></div> */}
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
                  className={`px-2 py-1 border rounded mt-3 flex flex-row justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 cursor-pointer  ${
                    isUploading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {isUploading ? (
                    <>
                      <Spinner className="w-4 h-4 animate-spin text-blue-500" />
                      <p>Đang tải...</p>
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4" />
                      <p>Chụp ảnh</p>
                    </>
                  )}
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
          <button
            onClick={handleNewOrder}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Mới
          </button>
          <button
            onClick={handleExit}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            Thoát
          </button>
          <button
            type="submit"
            form="report-form" // Liên kết với ID của form
            disabled={isSubmitting}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Đang xử lý..." : "Kết thúc"}
          </button>
        </div>
      </div>
    </div>
  );
}
function formatNutriText(text: string) {
   return text
    .replace(/NUTRITIONAL GUIDANCE:/g, "NUTRITIONAL GUIDANCE:\n")
    .replace(/RECOMMENDED FOODS:/g, "\nRECOMMENDED FOODS:\n")
    .replace(/FOODS TO AVOID:/g, "\nFOODS TO AVOID:\n")
    
    // Tự tách số thứ tự (1. 2. 3.)
    .replace(/(\d+\.)\s*/g, "$1 ")
    
    // Mỗi câu kết thúc bằng dấu chấm → xuống dòng
    .replace(/(?<!\b\d)\. ?/g, ".\n")

    // Tách dấu gạch đầu dòng
    .replace(/-\s*/g, "- ")

    // Xóa khoảng trống thừa
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .trim();
}