import { ListFilter, Search, X } from "lucide-react";
import { useState } from "react";

export type patientSearch = {
  patientNameValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sexValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearch: () => void;
  patientNumber: number;
  handleReset: () => void;
};
export default function SearchPatient({
  patientNameValue,
  sexValue,
  handleSearch,
  patientNumber,
  handleReset,
}: patientSearch) {
  const [found, setFound] = useState(false);
  const resetClick = () => {
    handleReset();
    // handleSearch();
    (document.getElementById("patientName") as HTMLInputElement)!.value = "";
    (document.getElementById("gender") as HTMLSelectElement).value = "";
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
          onChange={(e) => sexValue(e)}
          name="gender"
          id="gender"
          className="w-full px-3 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Gender</option>
          <option value="F">Female</option>
          <option value="M">Male</option>
          <option value="O">Other</option>
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
