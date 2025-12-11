import {
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Mars,
  Scan,
  User,
} from "lucide-react";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "../../../../components/ui/dialog";
import type { OrderResponse } from "../../../../types/order";
import { useState } from "react";
import axios from "axios";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  orders: OrderResponse[];
};

export default function PatientHistory({ open, setOpen, orders }: Props) {
  const [focusOrder, setFocusOrder] = useState<OrderResponse | null>(null);
  const onViewDicom = () => {
    if (focusOrder?.study === null) return;
    localStorage.setItem(
      "studyInstanceUID",
      focusOrder?.study.studyInstanceUID as string
    );
    localStorage.setItem(
      "seriesInstanceUID",
      focusOrder?.study.seriesInstanceUID as string
    );
    window.open(`/dicom-viewer`, "_blank");
  };
  const onViewInvoice = async () => {
    try {
      const id = focusOrder?.orderId as string;
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

  const onOrderClick = (order: OrderResponse) => {
    setFocusOrder(order);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto  sm:max-w-[140vh] bg-white rounded-t-xl">
        <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
          <div className="bg-blue-50/50 px-8 py-2 mt-3 border-b border-blue-100">
            <h1 className="text-lg font-semibold text-slate-800 tracking-tight">
              Patient Visit History
            </h1>
          </div>
          <div className="p-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Column: Patient Basic Info */}
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-slate-800 mb-4">
                  Patient Basic Info
                </h2>

                <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                  {/* Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <User size={18} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                        Name
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        John Doe
                      </p>
                    </div>
                  </div>
                  {/* ID */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <CreditCard size={18} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                        ID
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        1234567890
                      </p>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Mars size={18} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                        Gender
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        Male
                      </p>
                    </div>
                  </div>

                  {/* Age */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Clock size={18} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                        Age
                      </p>
                      <p className="text-sm font-semibold text-slate-900">45</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Information (Vertical Divider Logic) */}
              <div className="relative pl-0 md:pl-8 md:border-l border-slate-100 space-y-4">
                <h2 className="text-base font-semibold text-slate-800 mb-4">
                  Order Information
                </h2>

                <div className="grid grid-cols-2 gap-y-3">
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Order ID</p>
                    <p className="font-semibold text-slate-900">
                      #ORD-2024-5567
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Service Name</p>
                    <p className="font-semibold text-slate-900">
                      MRI Scan - Brain
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Doctor</p>
                    <p className="font-semibold text-slate-900">
                      Dr. Sarah Chen
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm mb-1">Date</p>
                    <p className="font-semibold text-slate-900">Oct 26, 2024</p>
                  </div>
                  <div className="col-span-2 mt-2">
                    <p className="text-slate-500 text-sm mb-1">Status</p>
                    <div className="flex items-center gap-1.5 text-green-600 font-medium">
                      <CheckCircle2 size={18} />
                      <span>Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-blue-300/50 text-slate-700 font-semibold border-b border-blue-100">
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Service</th>
                    <th className="py-4 px-6">Doctor</th>
                    <th className="py-4 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {orders.map((order: OrderResponse, index) => (
                    <tr
                      key={index}
                      // Highlight the first row to match image style usually indicating 'current selection'
                      onClick={() => onOrderClick(order)}
                      className={`${
                        order.orderId === focusOrder?.orderId ? "bg-blue-100/90" : "bg-white"
                      } hover:bg-blue-50 transition-colors duration-150`}
                    >
                      <td className="py-4 px-6 text-slate-800 font-medium">
                        {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {order.serviceItems[0].serviceName}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {order.doctor.fullName}
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full border border-green-100 inline-flex items-center gap-1">
                          <CheckCircle2 size={18} />
                          <span>Completed</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-4 pb-6">
            <div className="bg-white/40 backdrop-blur-sm rounded-xl p-2 shadow-inner border border-white/50 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onViewDicom}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 
      rounded-lg font-medium text-sm shadow-md active:scale-95 transition flex items-center justify-center gap-2"
              >
                <Scan size={18} />
                View DICOM Images
              </button>
              <button
                onClick={onViewInvoice}
                className="flex-1 bg-white hover:bg-slate-50 text-slate-700 py-2 px-4 
      rounded-lg font-medium text-sm border border-slate-200 shadow-sm active:scale-95 transition flex items-center justify-center gap-2"
              >
                <FileText size={18} />
                View Invoice
              </button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="hover:bg-gray-500/50">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
