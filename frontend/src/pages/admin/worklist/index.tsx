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
    orderCode?: string;
    dateCreated?: string;
  }>({ patientName: "", priority: "", orderCode: "", dateCreated: new Date().toISOString().split("T")[0] });
  const [searchValues, setSearchValues] = useState<{
    patientName: string;
    priority: string;
    orderCode?: string;
    dateCreated?: string;
  }>({ patientName: "", priority: "", orderCode: "", dateCreated: new Date().toISOString().split("T")[0] });
  const patientNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, patientName: e.target.value });
  };
  const priorityValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, priority: e.target.value });
  };
  const orderCodeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, orderCode: e.target.value });
  };
  const dateCreatedValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, dateCreated: e.target.value });
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
      orderCode: "",
      dateCreated: new Date().toISOString().split("T")[0],
    })
    setSearchValues({
      patientName: "",
      priority: "",
      orderCode: "",
      dateCreated: new Date().toISOString().split("T")[0],
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
          orderCode={orderCodeValue}
          dateCreated={dateCreatedValue}
          dateCreatedValue={formValues.dateCreated}
        />
      </div>
      <div>
          <OrdersRender
            patientName={searchValues.patientName}
            priority={searchValues.priority}
            orderCode={searchValues.orderCode}
            getOrdersCount={handleGetOrdersCount}
            dateCreated={searchValues.dateCreated}
          />
      </div>
    </div>
  );
}
