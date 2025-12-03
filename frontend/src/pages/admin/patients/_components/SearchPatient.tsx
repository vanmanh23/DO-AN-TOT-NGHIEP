import { ListFilter, Plus, Search, X } from "lucide-react";
import { useState } from "react";
import FormEditPatient from "./FormEditPatient";

export type patientSearch = {
  patientNameValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  patientType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  findById: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  patientNumber?: number;
  handleReset: () => void;
};
export default function SearchPatient({
  patientNameValue,
  patientType,
  handleSearch,
  findById,
  patientNumber,
  handleReset,
}: patientSearch) {
  const [found, setFound] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const resetClick = () => {
    const patientNameEl = document.getElementById(
      "patientName"
    ) as HTMLInputElement | null;
    const genderEl = document.getElementById(
      "gender"
    ) as HTMLSelectElement | null;
    const patientIdEl = document.getElementById(
      "patient_id"
    ) as HTMLInputElement | null;

    if (patientNameEl) patientNameEl.value = "";
    if (genderEl) genderEl.value = "";
    if (patientIdEl) patientIdEl.value = "";
    handleReset();
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
          All patient: ({patientNumber})
        </h3>
      </div>
      <div className="flex md:flex-row flex-col md:items-center items-end gap-2 md:h-8 h-full ">
        <div
          onClick={() => setOpenEdit(true)}
          className="flex flex-row items-center gap-2 bg-bg-secondary text-white md:px-3 px-2 py-1 rounded-md cursor-pointer hover:bg-bg-secondary/70"
        >
          <Plus size={16} />
          <p> New</p>
        </div>

        <div className="flex flex-row items-center h-full gap-2 pl-2 border-slate-200 rounded-md border">
          <Search className="text-secondary" size={16} />
          <input
            id="patient_id"
            type="text"
            placeholder="Search by patient ID"
            onChange={(e) => findById(e)}
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
          <option value="" className="text-gray-400">
            Patient gender
          </option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Others</option>
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
      <FormEditPatient open={openEdit} setOpen={setOpenEdit} isCreate={true} />
    </div>
  );
}
