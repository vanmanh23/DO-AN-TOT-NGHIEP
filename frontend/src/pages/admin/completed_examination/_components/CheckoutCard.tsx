import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import type { OrderResponse } from "../../../../types/order";
import { ArrowRight } from "lucide-react";
import paymentApis from "../../../../apis/paymentApis";
import { Spinner } from "../../../../components/ui/spinner";
import { toast } from "sonner";

type Props = {
  order: OrderResponse;
};

export default function CheckoutCard({ order }: Props) {
  const [selectedMethod, setSelectedMethod] = useState("cash");
  const [isProcessing, setIsProcessing] = useState(false);

  const payHandle = async (billTotal: number) => {
    try {
      setIsProcessing(true);
      if (selectedMethod === "vnpay") {
        const res = await paymentApis.vnPay(billTotal.toString(), order.payment?.id as string);
        window.open(res, "_blank");
        window.location.reload();
      }
      if (selectedMethod === "cash") {
        await paymentApis.changeStatus(order.payment?.id as string);
        toast.success("Payment success!", { duration: 2000, richColors: true });
        window.location.reload();
      }
    } catch (error) {
      toast.error("Payment failed!", { duration: 2000, richColors: true });
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button
            className="
        flex items-center justify-center 
        gap-1 px-4 py-2 
        bg-blue-600 hover:bg-blue-700 
        text-white font-semibold text-sm 
        rounded-lg shadow-md hover:shadow-lg
        transition duration-300 ease-in-out
        group
      "
          >
            <p className="text-sm">Pay</p>
            <ArrowRight
              size={14}
              className="
          transition duration-300 ease-in-out
          group-hover:translate-x-1 // Di chuyển mũi tên sang phải khi hover
        "
            />
          </button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-[70vw] overflow-scroll bg-gray-50 p-4  font-sans text-gray-800 flex justify-center">
          <div>
            <div className="max-w-4xl w-full space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold mb-4">
                      Patient Information
                    </h2>
                    <div className="space-y-3 text-sm">
                      <InfoRow
                        label="Patient Name"
                        value={order.patient?.patientName}
                      />
                      <InfoRow label="Patient ID" value={order.patient?.id} />
                      <InfoRow
                        label="Contact"
                        value={order.patient?.phoneNumber}
                      />
                    </div>
                  </div>

                  {/* Card: Invoice Details */}
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold mb-4">Invoice Details</h2>
                    <div className="space-y-1 text-sm">
                      <InfoRow
                        label="Service"
                        value={order.serviceItems
                          .map((item) => item.serviceName)
                          .join(", ")}
                      />
                      <InfoRow
                        label="Date"
                        value={new Date(order.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      />
                      <InfoRow label="Invoice No." value="INV-2024-A8B9C" />
                      <InfoRow label="Clinic" value="Da Nang Hospital" />
                    </div>
                  </div>
                </div>

                {/* CỘT PHẢI: Tóm tắt thanh toán */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
                  <h2 className="text-lg font-bold mb-2">Billing Summary</h2>
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm mb-1">Total Amount:</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {order.payment?.amount} VNĐ
                    </p>
                  </div>

                  <div className="border-t border-gray-100 my-2"></div>
                  {/* 
                  <div className="space-y-1 text-sm mb-3">
                    <BillingRow
                      label="Subtotal"
                      value={invoiceData.billing.subtotal}
                    />
                    <BillingRow
                      label="Tax (VAT 8%)"
                      value={invoiceData.billing.tax}
                    />
                    <BillingRow
                      label="Service Fee"
                      value={invoiceData.billing.fee}
                    />
                  </div> */}

                  {/* Insurance applied badge */}
                  <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                    <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                    <span>Insurance Applied (None)</span>
                  </div>
                </div>
              </div>

              {/* --- PHẦN CHỌN PHƯƠNG THỨC THANH TOÁN --- */}
              <div>
                <h2 className="text-lg font-bold mb-4">
                  Select Payment Method
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Option 1: Cash */}
                  <PaymentOption
                    id="cash"
                    selected={selectedMethod === "cash"}
                    onClick={() => setSelectedMethod("cash")}
                    title="Cash"
                    subtext="Pay at the clinic counter"
                  >
                    {/* Icon tiền mặt đơn giản */}
                    <div className="text-4xl mb-1">💵</div>
                  </PaymentOption>

                  {/* Option 2: VNPAY */}
                  <PaymentOption
                    id="vnpay"
                    selected={selectedMethod === "vnpay"}
                    onClick={() => setSelectedMethod("vnpay")}
                    title="VNPAY"
                    subtext="Scan QR code with banking app"
                  >
                    {/* Giả lập logo VNPAY */}
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <span className="text-2xl font-bold text-red-600">
                        VN
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        PAY
                      </span>
                      <span className="text-xs border border-blue-600 text-blue-600 px-1 rounded ml-1">
                        QR
                      </span>
                    </div>
                  </PaymentOption>
                </div>
              </div>
              <button
                onClick={() => payHandle(order.payment?.amount || 0)}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-base"
              >
                {isProcessing ? (
                  <>
                    <Spinner />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Pay Now - {order.payment?.amount} ₫</span>
                    <LockIcon className="w-5 h-5 opacity-80" />
                  </>
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-start">
    <span className="text-gray-500 w-1/3">{label}</span>
    <span className="text-gray-900 font-medium text-right w-2/3">{value}</span>
  </div>
);

const BillingRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-500">{label}</span>
    <span className="text-gray-900 font-medium">{value}</span>
  </div>
);

const PaymentOption = ({ id, selected, onClick, title, subtext, children }) => (
  <div
    onClick={onClick}
    className={`relative cursor-pointer rounded-xl border-2 p-6 flex flex-col items-center justify-center transition-all duration-200 h-32
      ${
        selected
          ? "border-blue-500 bg-blue-50 shadow-inner"
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
      }`}
  >
    {/* Checkmark icon ở góc khi được chọn */}
    {selected && (
      <div className="absolute top-3 right-3 text-blue-600">
        <CheckCircleIcon className="w-6 h-6 fill-blue-600 text-white" />
      </div>
    )}

    {/* Radio circle khi chưa chọn (giống hình bên phải) */}
    {!selected && (
      <div className="absolute top-3 right-3 w-5 h-5 rounded-full border-2 border-gray-300"></div>
    )}

    {children}
    <div className="text-center">
      <p
        className={`font-bold text-lg ${
          selected ? "text-blue-700" : "text-gray-800"
        }`}
      >
        {title}
      </p>
      <p className="text-xs text-gray-500 mt-1">{subtext}</p>
    </div>
  </div>
);

// --- ICONS (SVG dạng Component) ---
const CheckCircleIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      clipRule="evenodd"
    />
  </svg>
);

const LockIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
    />
  </svg>
);
