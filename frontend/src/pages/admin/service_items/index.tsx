import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { setOption } from "../../../features/navbarsection/navbarSection";
import ServiceItemsRender from "./_components/ServiceItemsRender";
import SearchService from "./_components/SearchService";

export default function Component() {
  const [getOrdersCount, setOrdersCount] = useState(0);
  const [formValues, setFormValues] = useState<{
    service_name: string;
    modality: string;
    service_code?: string;
  }>({ service_name: "", modality: "", service_code: "" });
  const [searchValues, setSearchValues] = useState<{
    service_name: string;
    modality: string;
    service_code?: string;
  }>({ service_name: "", modality: "", service_code: "" });
  const serviceNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, service_name: e.target.value });
  };
  const modality = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, modality: e.target.value });
  };
  const service_codeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, service_code: e.target.value });
  };
  const dispatch = useDispatch<AppDispatch>();
  const handleSearch = () => {
    setSearchValues(formValues);
  };
  const handleGetOrdersCount  =  (count: number) => {
    setOrdersCount(count);
  }
  const handleReset = () => {
    setSearchValues({
      service_name: "",
      modality: "",
      service_code: "",
    });
  };
  useEffect(() => {
    dispatch(setOption("Service Items"));
  }, []);
  return (
    <div className="flex flex-col gap-3 px-6">
      <div>
        <SearchService
          serviceNameValue={serviceNameValue}
          modality={modality}
          serviceCodeValue={service_codeValue}
          handleSearch={handleSearch}
          ordersNumber={getOrdersCount}
          handleReset={handleReset}
        />
      </div>
      <div>
          <ServiceItemsRender
            serviceName={searchValues.service_name}
            serviceCode={searchValues.service_code}
            modality={searchValues.modality}
            getOrdersCount={handleGetOrdersCount}
          />
      </div>
    </div>
  );
}
