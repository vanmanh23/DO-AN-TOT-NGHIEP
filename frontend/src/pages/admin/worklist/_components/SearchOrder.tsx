import { ListFilter, Search, X } from "lucide-react";
import { useState } from "react";

export type patientSearch = {
  patientNameValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  patientType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  orderId: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  ordersNumber?: number;
  handleReset: () => void;
};
export default function SearchOrder({
  patientNameValue,
  patientType,
  handleSearch,
  orderId,
  ordersNumber,
  handleReset,
}: patientSearch) {
  const [found, setFound] = useState(false);
  const resetClick = () => {
    handleReset();
    // handleSearch();
    // (document.getElementById("patientName") as HTMLInputElement)!.value = "";
    // (document.getElementById("patient_type") as HTMLSelectElement).value = "";
    // (document.getElementById("order_id") as HTMLInputElement).value = "";
    const patientNameEl = document.getElementById("patientName") as HTMLInputElement | null;
    const patient_typeEl = document.getElementById("patient_type") as HTMLSelectElement | null;
    const orderIdEl = document.getElementById("order_id") as HTMLInputElement | null;
    
    if (patientNameEl) patientNameEl.value = "";
    if (patient_typeEl) patient_typeEl.value = "";
    if (orderIdEl) orderIdEl.value = "";
    setFound(false);
  };
  const searchClick = () => {
    handleSearch();
    setFound(true);
  };
  return (
    <div className="w-full flex md:flex-row flex-col justify-between">
      <div>
        <h3 className="md:text-xl text-xs font-semibold">
          All Orders: ({ordersNumber})
        </h3>
      </div>
      <div className="flex md:flex-row flex-col md:items-center items-end gap-2 md:h-8 h-full ">
        <div className="flex flex-row items-center h-full gap-2 pl-2 border-slate-200 rounded-md border">
          <Search className="text-secondary" size={16} />
          <input
            id="order_id"
            type="text"
            placeholder="Search by order ID"
            onChange={(e) => orderId(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchClick();
              }
            }}
            className="outline-bg-secondary  pl-2"
          />
        </div>
        <div className="flex flex-row items-center h-full gap-2 pl-2 border-slate-200 rounded-md border">
          <Search className="text-secondary" size={16} />
          <input
            id="patientName"
            type="text"
            placeholder="Search by name"
            onChange={(e) => patientNameValue(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchClick();
              }
            }}
            className="outline-bg-secondary  pl-2"
          />
        </div>
        <select
          onChange={(e) => patientType(e)}
          name="patient_type"
          id="patient_type"
          className="w-full px-3 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" className="text-gray-400">Patient type</option>
          <option value="OUTPATIENT">Outpatient</option>
          <option value="INPATIENT">Inpatient</option>
          <option value="EMERGENCY">Emergency</option>
          <option value="VIP">Vip</option>
          <option value="FOLLOW UP">Follow up</option>
        </select>
        <button
          onClick={searchClick}
          className="flex flex-row items-center gap-1 bg-bg-secondary font-semibold text-white md:px-2 p-1 w-28 rounded-md hover:bg-bg-secondary/70"
        >
          <ListFilter size={16} />
          <p>Filter</p>
        </button>
        {found && (
          <div onClick={resetClick}>
            <X size={16} className="text-secondary cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
}
