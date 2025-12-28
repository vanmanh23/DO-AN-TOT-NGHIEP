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
    dateCreated: string;
    findById?: string;
  }>({ patientName: "", dateCreated: "", findById: "" });
  const [searchValues, setSearchValues] = useState<{
    patientName: string;
    dateCreated: string;
    findById?: string;
  }>({ patientName: "", dateCreated: "", findById: "" });
  const patientNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, patientName: e.target.value });
  };
  const dateCreated = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, dateCreated: e.target.value });
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
      dateCreated: "",
      findById: "",
    })
    setSearchValues({
      patientName: "",
      dateCreated: "",
      findById: "",
    });
  };
  useEffect(() => {
    dispatch(setOption("Orders"));
  }, []);
  return (
    <div className="flex flex-col gap-3 px-6">
      <div>
        <SearchOrder
          patientNameValue={patientNameValue}
          handleSearch={handleSearch}
          ordersNumber={getOrdersCount}
          handleReset={handleReset}
          dateCreated={dateCreated}
          orderId={findByIdValue}
        />
      </div>
      <div>
          <OrdersRender
            patientName={searchValues.patientName}
            dateCreated={searchValues.dateCreated}
            order_id={searchValues.findById}
            getOrdersCount={handleGetOrdersCount}
          />
      </div>
    </div>
  );
}
