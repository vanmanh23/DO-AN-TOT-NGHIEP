import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { setOption } from "../../../features/navbarsection/navbarSection";
import DevicesRender from "./_components/DevicesRender";
import SearchDevice from "./_components/SearchDevice";

export default function Component() {
  const [getDevicesCount, setDevicesCount] = useState(0);
  const [formValues, setFormValues] = useState<{
    status: string;
    type: string;
  }>({ status: "", type: "" });
  const [searchValues, setSearchValues] = useState<{
    status: string;
    type: string;
  }>({ status: "", type: "" });
  const statusNameValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, status: e.target.value });
  };
  const type = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, type: e.target.value });
  };
  const dispatch = useDispatch<AppDispatch>();
  const handleSearch = () => {
    setSearchValues(formValues);
  };
  const handleGetDevicesCount  =  (count: number) => {
    setDevicesCount(count);
  }
  const handleReset = () => {
    setFormValues({
      status: "",
      type: "",
    })
    setSearchValues({
      status: "",
      type: "",
    });
  };
  useEffect(() => {
    dispatch(setOption("Device Management"));
  }, []);
  return (
    <div className="flex flex-col gap-3 px-6">
      <div>
        <SearchDevice
          statusNameValue={statusNameValue}
          type={type}
          handleSearch={handleSearch}
          DevicesNumber={getDevicesCount}
          handleReset={handleReset}
        />
      </div>
      <div>
          <DevicesRender
            status={searchValues.status}
            type={searchValues.type}
            getDevicesCount={handleGetDevicesCount}
          />
      </div>
    </div>
  );
}
