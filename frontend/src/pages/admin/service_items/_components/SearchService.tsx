import { ListFilter, Plus, Search, X } from "lucide-react";
import { useState } from "react";
import FormEditService from "./FormEditService";

export type patientSearch = {
  serviceNameValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  modality: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  serviceCodeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  ordersNumber?: number;
  handleReset: () => void;
};
export default function SearchService({
  serviceNameValue,
  modality,
  handleSearch,
  serviceCodeValue,
  ordersNumber,
  handleReset,
}: patientSearch) {
  const [found, setFound] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const resetClick = () => {
    handleReset();
    const serviceNameEl = document.getElementById("service_name") as HTMLInputElement | null;
    const serviceCodeEl = document.getElementById("service_code") as HTMLSelectElement | null;
    const ModalityEl = document.getElementById("modality") as HTMLInputElement | null;
    
    if (serviceNameEl) serviceNameEl.value = "";
    if (serviceCodeEl) serviceCodeEl.value = "";
    if (ModalityEl) ModalityEl.value = "";
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
          All Service Items: ({ordersNumber})
        </h3>
      </div>
      <div className="flex md:flex-row flex-col md:items-center items-end gap-2 md:h-8 h-full ">
        <div onClick={() => setOpenEdit(true)} className="flex flex-row items-center gap-2 bg-bg-secondary text-white md:px-3 px-2 py-1 rounded-md cursor-pointer hover:bg-bg-secondary/70">
          <Plus size={16} />
          <p> New</p>
        </div>
        <div className="flex flex-row items-center h-full gap-2 pl-2 border-slate-200 rounded-md border">
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
        </div>
        <div className="flex flex-row items-center h-full gap-2 pl-2 border-slate-200 rounded-md border">
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
        </div>
        <select
          onChange={(e) => modality(e)}
          name="modality"
          id="modality"
          className="w-full px-3 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" className="text-gray-400">Modality</option>
          <option value="CT">CT</option>
          <option value="XRAY">XRAY</option>
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
      <FormEditService open={openEdit} setOpen={setOpenEdit} isCreate={true} />
    </div>
  );
}
