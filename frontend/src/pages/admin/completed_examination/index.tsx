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
    orderCode?: string;
  }>({ patientName: "", statusPayment: "", orderCode: "" });
  const [searchValues, setSearchValues] = useState<{
    patientName: string;
    statusPayment: string;
    orderCode?: string;
  }>({ patientName: "", statusPayment: "", orderCode: "" });
  const patientNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, patientName: e.target.value });
  };
  const statusPaymentValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({ ...formValues, statusPayment: e.target.value });
  };
  const orderCodeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, orderCode: e.target.value });
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
      orderCode: "",
    })
    setSearchValues({
      patientName: "",
      statusPayment: "",
      orderCode: "",
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
          statusPayment={statusPaymentValue}
          orderCode={orderCodeValue}
        />
      </div>
      <div>
          <OrdersCompeletedRender
            patientName={searchValues.patientName}
            statusPayment={searchValues.statusPayment}
            orderCode={searchValues.orderCode}
            getOrdersCount={handleGetOrdersCount}
          />
      </div>
    </div>
  );
}
