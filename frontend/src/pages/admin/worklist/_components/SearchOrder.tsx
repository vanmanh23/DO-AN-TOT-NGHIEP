import { ListFilter, Search, X } from "lucide-react";
import { useState } from "react";

export type patientSearch = {
  patientNameValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  priorityValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  orderCode: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dateCreated: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dateCreatedValue?: string;
  handleSearch: () => void;
  ordersNumber?: number;
  handleReset: () => void;
};
export default function SearchOrder({
  patientNameValue,
  priorityValue,
  handleSearch,
  orderCode,
  dateCreated,
  dateCreatedValue,
  ordersNumber,
  handleReset,
}: patientSearch) {
  const [found, setFound] = useState(false);
  const resetClick = () => {
    handleReset();
    const patientNameEl = document.getElementById(
      "patientName"
    ) as HTMLInputElement | null;
    const priorityEl = document.getElementById(
      "priority"
    ) as HTMLSelectElement | null;
    const orderCodeEl = document.getElementById(
      "orderCodeId"
    ) as HTMLInputElement | null;
    const dateCreatedEl = document.getElementById(
      "dateCreatedId"
    ) as HTMLInputElement | null;

    if (patientNameEl) patientNameEl.value = "";
    if (priorityEl) priorityEl.value = "";
    if (orderCodeEl) orderCodeEl.value = "";
    if (dateCreatedEl) dateCreatedEl.value = "";
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
        <input
          type="date"
          id="dateCreatedId"
          name="dateCreatedId"
          value={dateCreatedValue}
          onChange={(e) => dateCreated(e)}
          placeholder="Search by date created"
          className="w-full px-3 py-1 border border-gray-300 rounded-lg shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="flex flex-row items-center h-full gap-2 pl-2 border-slate-200 rounded-md border">
          <Search className="text-secondary" size={16} />
          <input
            id="orderCodeId"
            type="text"
            placeholder="Search by order code"
            onChange={(e) => orderCode(e)}
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
          onChange={(e) => priorityValue(e)}
          name="priority"
          id="priority"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchClick();
            }
          }}
          className="w-full px-3 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" className="text-gray-400">
            Priority
          </option>
          <option value="ROUTINE">ROUTINE</option>
          <option value="URGENT">URGENT</option>
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
