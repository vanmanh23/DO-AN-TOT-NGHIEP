import { ListFilter } from "lucide-react";

type Studyprops = {
  namefield: string;
  value: string;
  onChange: (value: string) => void;
  typeinput: string;
};
export default function FormSearch({ namefield, value, onChange, typeinput }: Studyprops) {
  return (
    <div className="flex flex-col gap-2 md:text-base text-sm md:w-1/6 w-full">
      <label>{namefield}</label>
      <div className="flex flex-row gap-2 items-center">
        <input
          type={typeinput}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          name="cheese"
          className=" border border-gray-300 outline-bg-secondary text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-1"
        />
        <ListFilter />
      </div>
    </div>
  );
}
