import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { ArrowRight } from "lucide-react";
import type {
  OrderResponse,
} from "../../../../types/order";

type Props = {
  order: OrderResponse;
};

export default function InvoiceCard({ order }: Props) {
  console.log("order", order);
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button
            className="
        flex items-center justify-center 
        gap-1 px-3 py-2 
        bg-blue-600 hover:bg-blue-700 
        text-white font-semibold text-sm 
        rounded-lg shadow-md hover:shadow-lg
        transition duration-300 ease-in-out
        group
      "
          >
            <p className="text-sm">Invoice</p>
            <ArrowRight
              size={14}
              className="
          transition duration-300 ease-in-out
          group-hover:translate-x-1 // Di chuyển mũi tên sang phải khi hover
        "
            />
          </button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-[50vw] overflow-y-auto bg-gray-50 p-4  font-sans text-gray-800 flex justify-center">
          <div className="w-full ">
            {/* Invoice Card Container */}
            <div className="bg-white max-w-4xl w-full p-10 rounded-xl shadow-lg font-sans">
              <div className="flex justify-between gap-8 items-start">
                <div>
                  <InvoiceHeader />
                  <h1 className="text-4xl font-extrabold text-slate-700 mt-4">
                    INVOICE
                  </h1>
                  <p className="text-sm mt-4 text-gray-700">
                    <strong>Invoice No:</strong> {order?.patient?.id}
                    <br />
                    <strong>Date:</strong>{" "}
                    {new Date(
                      order?.payment?.paidAt as string
                    ).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div>
                  <CustomerDetails order={order} />
                </div>
              </div>

              {/* Service Items Table */}
              <InvoiceTable order={order} />

              {/* PAID Status and Footer */}
              <div className="flex justify-between items-end mt-8 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Thank you for choosing
                  <br /> our medical examination and treatment services!
                </p>
                <div className="bg-slate-500 px-8 py-2 text-white text-lg font-bold rounded-full shadow-lg opacity-85">
                  PAID
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
// --- Helper Functions ---
const formatVND = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
    .format(amount)
    .replace("₫", "VND");
};
// --- Sub-Components ---

const InvoiceHeader = () => (
  <div className="flex items-center text-slate-600">
    {/* Simple Logo Placeholder */}
    <svg
      className="w-8 h-8 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 8h16M4 16h16M12 4v16"
      />
    </svg>
    <span className="text-lg font-semibold">MediCare Solutions</span>
  </div>
);

const CustomerDetails = ({ order }: Props) => (
  <div className="text-sm space-y-1">
    <h3 className="font-bold text-lg mb-2 text-slate-700">Customer Details</h3>
    <p>
      <strong>Patient Name:</strong> {order?.patient?.patientName}
    </p>
    <p>
      <strong>Address:</strong> {order?.patient?.address}
    </p>
    <p>
      <strong>Phone Number:</strong> {order?.patient?.phoneNumber}
    </p>
    <p>
      <strong>Payment Method:</strong> {order?.payment?.method}
    </p>
  </div>
);

const InvoiceTable = ({ order }: Props) => (
  <div className="mt-8">
    {/* Table Header */}
    <div className="grid grid-cols-[5%_30%_25%_20%_20%] text-white font-semibold text-sm bg-slate-500 rounded-t-lg">
      <div className="p-3 text-center rounded-tl-lg">No.</div>
      <div className="p-3">Service Item</div>
      <div className="p-3 text-right">Service Code</div>
      <div className="p-3 text-right">Unit Price</div>
      <div className="p-3 text-right rounded-tr-lg">Total</div>
    </div>
    {/* Table Rows */}
    {order?.serviceItems.map((item, index) => (
      <div
        key={index}
        className={`grid grid-cols-[5%_30%_25%_20%_20%] text-sm ${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        } border-b border-gray-100`}
      >
        <div className="p-3 text-center text-gray-600">{index + 1}</div>
        <div className="p-3 text-gray-800 truncate">{item.serviceName}</div>
        <div className="p-3 text-right">{item.serviceCode}</div>
        <div className="p-3 text-right">{formatVND(item.unitPrice)}</div>
        <div className="p-3 text-right font-medium">
          {formatVND(item.unitPrice)}
        </div>
      </div>
    ))}

    {/* Totals Summary */}
    <div className="flex justify-end mt-4">
      <div className="w-full max-w-xs text-sm space-y-2">
        <SummaryRow
          label="Grand Total"
          value={formatVND(order?.payment?.amount as number)}
          isGrandTotal
        />
      </div>
    </div>
  </div>
);

const SummaryRow = ({ label, value, isGrandTotal }) => (
  <div
    className={`flex justify-between ${
      isGrandTotal ? "text-lg font-bold text-slate-700" : "text-gray-700"
    }`}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);
