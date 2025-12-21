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
    statusPayment: string;
    findById?: string;
  }>({ patientName: "", statusPayment: "", findById: "" });
  const [searchValues, setSearchValues] = useState<{
    patientName: string;
    statusPayment: string;
    findById?: string;
  }>({ patientName: "", statusPayment: "", findById: "" });
  const patientNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, patientName: e.target.value });
  };
  const statusPaymentValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, statusPayment: e.target.value });
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
      statusPayment: "",
      findById: "",
    })
    setSearchValues({
      patientName: "",
      statusPayment: "",
      findById: "",
    });
  };
  useEffect(() => {
    dispatch(setOption("Completed examination"));
  }, []);
  console.log("render completed examination page", searchValues);
  return (
    <div className="flex flex-col gap-3 px-6">
      <div>
        <SearchOrderCompeleted
          patientNameValue={patientNameValue}
          handleSearch={handleSearch}
          ordersNumber={getOrdersCount}
          handleReset={handleReset}
          statusPayment={statusPaymentValue}
          orderId={findByIdValue}
        />
      </div>
      <div>
          <OrdersCompeletedRender
            patientName={searchValues.patientName}
            statusPayment={searchValues.statusPayment}
            order_id={searchValues.findById}
            getOrdersCount={handleGetOrdersCount}
          />
      </div>
    </div>
  );
}
