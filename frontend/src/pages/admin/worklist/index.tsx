import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { setOption } from "../../../features/navbarsection/navbarSection";
import SearchOrder from "./_components/SearchOrder";
import OrdersRender from "./_components/OrdersRender";

export default function Component() {
  const [getOrdersCount, setOrdersCount] = useState(0);
  const [formValues, setFormValues] = useState<{
    patientName: string;
    priority: string;
    findById?: string;
  }>({ patientName: "", priority: "", findById: "" });
  const [searchValues, setSearchValues] = useState<{
    patientName: string;
    priority: string;
    findById?: string;
  }>({ patientName: "", priority: "", findById: "" });
  const patientNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, patientName: e.target.value });
  };
  const priorityValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, priority: e.target.value });
  };
  const findByIdValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, findById: e.target.value });
  };
  const dispatch = useDispatch<AppDispatch>();
  const handleSearch = () => {
    setSearchValues(formValues);
  };
  const handleGetOrdersCount  =  (count: number) => {
    setOrdersCount(count);
  }
  const handleReset = () => {
    setFormValues({
      patientName: "",
      priority: "",
      findById: "",
    })
    setSearchValues({
      patientName: "",
      priority: "",
      findById: "",
    });
  };
  useEffect(() => {
    dispatch(setOption("Worklist"));
  }, []);
  return (
    <div className="flex flex-col gap-3 px-6">
      <div>
        <SearchOrder
          patientNameValue={patientNameValue}
          handleSearch={handleSearch}
          ordersNumber={getOrdersCount}
          handleReset={handleReset}
          priorityValue={priorityValue}
          orderId={findByIdValue}
        />
      </div>
      <div>
          <OrdersRender
            patientName={searchValues.patientName}
            priority={searchValues.priority}
            order_id={searchValues.findById}
            getOrdersCount={handleGetOrdersCount}
          />
      </div>
    </div>
  );
}
