import { MonitorPlay } from "lucide-react";
import type { OrderResponse } from "../../../../types/order";
import axios from "axios";

type Props = {
  order?: OrderResponse;
};

export default function PatientListAction({ order }: Props) {
  const handleOpenReport = async () => {
    try {
      const id = order?.orderId as string;
      const response = await axios.get(
        `http://localhost:8081/api/report-results/generate_pdf/${id}`,
        {
          responseType: "blob", // Quan trọng!!!
        }
      );
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);

      window.open(fileURL, "_blank");
    } catch (error) {
      console.error("Không thể mở file PDF:", error);
      alert("Đã xảy ra lỗi khi tải báo cáo.");
    }
  };
  return (
    <div className="z-20">
      <div
        onClick={handleOpenReport}
        className="cursor-pointer text-blue-600 hover:underline flex items-center gap-1"
      >
        <MonitorPlay />
      </div>
    </div>
  );
}
