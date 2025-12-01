import { ListFilter, Plus, X } from "lucide-react";
import { useState } from "react";
import FormEditDevice from "./FormEditDevice";

export type patientSearch = {
  statusNameValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  type: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearch: () => void;
  DevicesNumber?: number;
  handleReset: () => void;
};
export default function SearchService({
  statusNameValue,
  type,
  handleSearch,
  DevicesNumber,
  handleReset,
}: patientSearch) {
  const [found, setFound] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const resetClick = () => {
    handleReset();
    const statusEl = document.getElementById("status") as HTMLSelectElement | null;
    const typeEl = document.getElementById("type") as HTMLSelectElement | null;
    
    if (statusEl) statusEl.value = "";
    if (typeEl) typeEl.value = "";
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
          All Devices: ({DevicesNumber})
        </h3>
      </div>
      <div className="flex md:flex-row flex-col md:items-center items-end gap-2 md:h-8 h-full ">
        <div onClick={() => setOpenEdit(true)} className="flex flex-row items-center gap-2 bg-bg-secondary text-white md:px-3 px-2 py-1 rounded-md cursor-pointer hover:bg-bg-secondary/70">
          <Plus size={16} />
          <p> New</p>
        </div>
        {/* <div className="flex flex-row items-center h-full gap-2 pl-2 border-slate-200 rounded-md border">
          <Search className="text-secondary" size={16} />
          <input
            id="service_code"
            type="text"
            placeholder="Search by service code"
            onChange={(e) => serviceCodeValue(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchClick();
              }
            }}
            className="outline-bg-secondary  pl-2"
          />
        </div> */}
        {/* <div className="flex flex-row items-center h-full gap-2 pl-2 border-slate-200 rounded-md border">
          <Search className="text-secondary" size={16} />
          <input
            id="service_name"
            type="text"
            placeholder="Search by service name"
            onChange={(e) => serviceNameValue(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchClick();
              }
            }}
            className="outline-bg-secondary  pl-2"
          />
        </div> */}
        <select
          onChange={(e) => statusNameValue(e)}
          name="status"
          id="status"
          className="w-full px-3 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" className="text-gray-400">status</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Active">Active</option>
        </select>
        <select
          onChange={(e) => type(e)}
          name="type"
          id="type"
          className="w-full px-3 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" className="text-gray-400">type</option>
          <option value="CT">CT</option>
          <option value="MRI">MRI</option>
          <option value="XRAY">XRAY</option>
          <option value="US">US</option>
          <option value="MAMMO">MAMMO</option>
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
      <FormEditDevice open={openEdit} setOpen={setOpenEdit} isCreate={true} />
    </div>
  );
}
