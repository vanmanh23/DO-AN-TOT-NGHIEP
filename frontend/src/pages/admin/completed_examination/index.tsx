import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { setOption } from "../../../features/navbarsection/navbarSection";
import SearchOrderCompeleted from "./_components/SearchOrderCompeleted";
import OrdersCompeletedRender from "./_components/OrdersCompeletedRender";

export default function Component() {
  const [getOrdersCount, setOrdersCount] = useState(0);
  const [formValues, setFormValues] = useState<{
    patientName: string;
    patientType: string;
    findById?: string;
  }>({ patientName: "", patientType: "", findById: "" });
  const [searchValues, setSearchValues] = useState<{
    patientName: string;
    patientType: string;
    findById?: string;
  }>({ patientName: "", patientType: "", findById: "" });
  const patientNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, patientName: e.target.value });
  };
  const patientType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, patientType: e.target.value });
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
      patientType: "",
      findById: "",
    })
    setSearchValues({
      patientName: "",
      patientType: "",
      findById: "",
    });
  };
  useEffect(() => {
    dispatch(setOption("Completed examination"));
  }, []);
  return (
    <div className="flex flex-col gap-3 px-6">
      <div>
        <SearchOrderCompeleted
          patientNameValue={patientNameValue}
          handleSearch={handleSearch}
          ordersNumber={getOrdersCount}
          handleReset={handleReset}
          patientType={patientType}
          orderId={findByIdValue}
        />
      </div>
      <div>
          <OrdersCompeletedRender
            patientName={searchValues.patientName}
            patient_type={searchValues.patientType}
            order_id={searchValues.findById}
            getOrdersCount={handleGetOrdersCount}
          />
      </div>
    </div>
  );
}
