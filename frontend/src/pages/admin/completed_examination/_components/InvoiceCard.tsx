import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { ArrowRight } from "lucide-react";

export default function InvoiceCard() {
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
        <DialogContent className="max-h-[90vh] max-w-[70vw] overflow-scroll bg-gray-50 p-4  font-sans text-gray-800 flex justify-center">
          <div>
            {/* Invoice Card Container */}
            <div className="bg-white max-w-4xl w-full p-10 rounded-xl shadow-lg font-sans">
              {/* Header Section */}
              <div className="flex justify-between gap-8 items-start">
                <div>
                  <InvoiceHeader />
                  <h1 className="text-4xl font-extrabold text-slate-700 mt-4">
                    INVOICE
                  </h1>
                  <p className="text-sm mt-4 text-gray-700">
                    <strong>Invoice No:</strong> {invoiceData.invoiceNo}
                    <br />
                    <strong>Date:</strong> {invoiceData.date}
                  </p>
                </div>
                <div>
                  <CustomerDetails customer={invoiceData.customer} />
                </div>
              </div>

              {/* Service Items Table */}
              <InvoiceTable
                items={invoiceData.items}
                subtotal={invoiceData.subtotal}
                tax={invoiceData.tax}
                grandTotal={invoiceData.grandTotal}
              />

              {/* PAID Status and Footer */}
              <div className="flex justify-between items-end mt-8 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Thank you for your business!
                </p>

                {/* PAID Badge */}
                <div className="bg-slate-500 px-8 py-3 text-white text-xl font-bold rounded-full shadow-lg opacity-85">
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
const formatVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
    .format(amount)
    .replace("₫", "VND");
};

// --- Mock Data ---
const invoiceData = {
  invoiceNo: "INV-2024-1026",
  date: "October 26, 2024",
  customer: {
    customerName: "Nguyen Van A",
    patientName: "Tran Thi B",
    address: "123 Health Street, Hanoi, Vietnam",
    paymentDetails: "Bank Transfer, Acct: 1234567890",
    bank: "VCB",
  },
  items: [
    { no: 1, service: "General Consultation", quantity: 1, unitPrice: 500000 },
    { no: 2, service: "Blood Test (CBC)", quantity: 1, unitPrice: 300000 },
    { no: 3, service: "X-Ray (Chest)", quantity: 1, unitPrice: 400000 },
    {
      no: 4,
      service: "Medication (Prescription 1)",
      quantity: 1,
      unitPrice: 200000,
    },
  ],
  subtotal: 1400000,
  tax: 112000,
  grandTotal: 1512000,
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

const CustomerDetails = ({ customer }) => (
  <div className="text-sm space-y-1">
    <h3 className="font-bold text-lg mb-2 text-slate-700">Customer Details</h3>
    <p>
      <strong>Customer Name:</strong> {customer.customerName}
    </p>
    <p>
      <strong>Patient Name:</strong> {customer.patientName}
    </p>
    <p>
      <strong>Address:</strong> {customer.address}
    </p>
    <p>
      <strong>Payment Details:</strong> {customer.paymentDetails}
    </p>
    <p>
      <strong>Bank:</strong> {customer.bank}
    </p>
  </div>
);

const InvoiceTable = ({ items, subtotal, tax, grandTotal }) => (
  <div className="mt-8">
    {/* Table Header */}
    <div className="grid grid-cols-[5%_40%_15%_20%_20%] text-white font-semibold text-sm bg-slate-500 rounded-t-lg">
      <div className="p-3 text-center rounded-tl-lg">No.</div>
      <div className="p-3">Service Item</div>
      <div className="p-3 text-right">Quantity</div>
      <div className="p-3 text-right">Unit Price</div>
      <div className="p-3 text-right rounded-tr-lg">Total</div>
    </div>

    {/* Table Rows */}
    {items.map((item, index) => (
      <div
        key={index}
        className={`grid grid-cols-[5%_40%_15%_20%_20%] text-sm ${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        } border-b border-gray-100`}
      >
        <div className="p-3 text-center text-gray-600">{item.no}</div>
        <div className="p-3 text-gray-800">{item.service}</div>
        <div className="p-3 text-right">{item.quantity}</div>
        <div className="p-3 text-right">{formatVND(item.unitPrice)}</div>
        <div className="p-3 text-right font-medium">
          {formatVND(item.quantity * item.unitPrice)}
        </div>
      </div>
    ))}

    {/* Totals Summary */}
    <div className="flex justify-end mt-4">
      <div className="w-full max-w-xs text-sm space-y-2">
        <SummaryRow label="Subtotal" value={formatVND(subtotal)} />
        <SummaryRow label="Tax (VAT 8%)" value={formatVND(tax)} />
        <SummaryRow
          label="Grand Total"
          value={formatVND(grandTotal)}
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
