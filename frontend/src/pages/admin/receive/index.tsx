import { useQuery } from "@tanstack/react-query";
import { Calendar, FileText, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import orderApis from "../../../apis/orderApis";
import type {
  OrderResponse,
  Patient,
  PatientDTO,
  ServiceItem,
} from "../../../types/order";
import PatientFormInfo from "./_components/PatientFormInfo";
import patientApi from "../../../apis/patientApis";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import serviceItemsApis from "../../../apis/serviceItemsApis";
import { setOption } from "../../../features/navbarsection/navbarSection";
import type { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { patientSchema } from "../../../utils/schema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "../../../components/ui/spinner";

type Props = {
  orderUpdate?: OrderResponse;
};
export type PatientFormSchema = z.infer<typeof patientSchema>;

export default function Component() {
  // const [patientInfo, setPatientInfo] = useState<Patient>({
  //   name: "",
  //   birthdate: "",
  //   gender: "M",
  //   address: "",
  //   phoneNumber: "",
  //   identityCard: "",
  //   gmail: "",
  // });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isNotCreate, setIsNotCreate] = useState(true);
  const [patientAvailable, setPatientAvailable] = useState<PatientDTO>();
  
  const methods = useForm<PatientFormSchema>({
    resolver: zodResolver(patientSchema),
    // defaultValues: patientInfo,
     defaultValues: {
      name: "",
      birthdate: "",
      gender: "M",
      phoneNumber: "",
      identityCard: "",
      address: "",
      gmail: "",
    },
  });

  const [doctorPrescriptions, setDoctorPrescriptions] = useState<string>("");
  const [serviceType, setServiceType] = useState("CT");
  const [selectedService, setSelectedService] = useState<ServiceItem[]>([]);
  const [serviceList, setServiceList] = useState<ServiceItem[]>([]);
  const [currentService, setCurrentService] = useState("");
  const [patientIdUpdate, setPatientUpdateId] = useState("");
  const [OrderIdUpdate, setOrderIdUpdate] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const location = useLocation();
  const state = location.state as Props;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();


  useEffect(() => {
    if (state?.orderUpdate?.patientId) {
      setPatientUpdateId(state.orderUpdate.patientId);
      setOrderIdUpdate(state.orderUpdate.orderId as string);
      setSelectedService(state.orderUpdate.serviceItems || []);
      setIsUpdate(true);
    }
    console.log("state", state);
  }, [state?.orderUpdate?.patientId]);

  const handleAddToSelected = () => {
    if (!currentService || currentService === "-") return;
    const service = serviceList.find((s) => s.serviceName === currentService);
    if (
      service &&
      !selectedService.find((s) => s.serviceCode === service.serviceCode)
    ) {
      setSelectedService([...selectedService, service]);
      setCurrentService("");
    }
  };
  const getAllServices = async () => {
    try {
      const response = await serviceItemsApis.getByType(serviceType);
      setServiceList(response.result);
      return response.result;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dịch vụ:", error);
      return [];
    }
  };
  const { isLoading, error, isError } = useQuery({
    queryKey: ["modalities", serviceType], // unique key cho query này
    queryFn: getAllServices, // hàm fetch data
  });

  // Xử lý loading state
  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  // Xử lý error state
  if (isError) {
    return <div>Lỗi: {error.message}</div>;
  }
  const handleSubmit = async (data: Patient) => {
    try {
      console.log("Submitted data:", data);
      setIsProcessing(true);
      if (!isNotCreate) {
        const [patientRes] = await Promise.all([
          patientApi.create(data),
        ]);
        const ids = selectedService.map((s) => s.id);
        const orderRes = await orderApis.create({
          patientId: patientRes?.result?.id as "",
          serviceItemIds: ids,
          priority: "ROUTINE",
          status: "SCHEDULED",
          scheduledAt: "",
          completedAt: "",
          doctorId: doctorPrescriptions,
        });

        if (orderRes.success) {
          toast.success("Created order successfully!", {
            duration: 2000,
            richColors: true,
          });
          window.location.reload();
        }
      } else {
        const ids = selectedService.map((s) => s.id);
        const orderRes = await orderApis.create({
          patientId: patientAvailable?.id as "",
          serviceItemIds: ids,
          priority: "ROUTINE",
          status: "SCHEDULED",
          scheduledAt: "",
          completedAt: "",
          doctorId: doctorPrescriptions,
        });

        if (orderRes.success) {
          toast.success("Created order successfully!", {
            duration: 2000,
            richColors: true,
          });
          window.location.reload();
        }
      }
    } catch (err) {
      toast.error("Failed to create order!", {
        duration: 2000,
        richColors: true,
      });
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleUpdate = async (data: Patient) => {
    try {
      if (data.name !== "") {
        const patientUpdate = await patientApi.update(
          patientIdUpdate,
          data
        );
        console.log("patientUpdate", patientUpdate);
      }

      const ids = selectedService.map((s) => s.id);
      const orderRes = await orderApis.update(
        state?.orderUpdate?.orderId as string,
        {
          serviceItemIds: ids,
          priority: "ROUTINE",
          status: "SCHEDULED",
          studyId: "",
          scheduledAt: "",
          completedAt: "",
          doctorId: doctorPrescriptions,
        }
      );
      if (orderRes.success) {
        toast.success("Order updated successfully!", {
          duration: 2000,
          richColors: true,
        });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = (pathName: string): void => {
    dispatch(setOption(pathName));
    navigate("/admin");
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(isUpdate ? handleUpdate : handleSubmit)}>
        <div className="min-h-screen bg-gray-50">
          <div className="p-3 sm:p-4 md:p-6 lg:p-6">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <PatientFormInfo
                patientIdUpdate={patientIdUpdate}
                orderIdUpdate={OrderIdUpdate}
                chooseDoctor={setDoctorPrescriptions}
                isNotCreate={setIsNotCreate}
                patientAvailable={setPatientAvailable}
              />
              {/* Service Request Section */}
              <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-6">
                <h2 className="text-base sm:text-lg md:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
                  <span className="text-blue-600 text-lg sm:text-xl">📋</span>
                  <span className="truncate">Diagnostic Imaging Services</span>
                </h2>

                <div className="space-y-3 sm:space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Device Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option>CT</option>
                      <option>XRAY</option>
                      <option>MRI</option>
                      <option>MAMMO</option>
                      <option>US</option>
                    </select>
                  </div>

                  {/* Services */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Services <span className="text-red-500">*</span>
                    </label>

                    <div className="flex gap-1 sm:gap-2">
                      <select
                        value={currentService}
                        onChange={(e) => setCurrentService(e.target.value)}
                        className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500 "
                      >
                        <option value="">-- Select service --</option>
                        {serviceList?.map((service) => (
                          <option
                            key={service.serviceCode}
                            value={service.serviceName}
                          >
                            {service.serviceName}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={handleAddToSelected}
                        className="bg-blue-600 text-white px-2 sm:px-4 py-2 rounded hover:bg-blue-700 transition flex-shrink-0"
                      >
                        <Plus size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="border-t pt-3 sm:pt-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <h3 className="text-xs sm:text-sm font-medium">
                        Service List
                      </h3>
                      {isUpdate ? (
                        <div>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto">
                            <button
                              type="submit"
                              className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap flex-1 sm:flex-none"
                            >
                              <FileText size={14} className="sm:w-4 sm:h-4" />
                              UPDATE
                            </button>
                            <button className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-green-700 transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap flex-1 sm:flex-none">
                              CANCEL
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto">
                          <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed  font-semibold shadow-lg shadow-blue-200 transition-all active:scale-[0.99] flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap"
                          >
                            {isProcessing ? (
                              <>
                                <Spinner />
                                <span>Processing...</span>
                              </>
                            ) : (
                              <>Save Request</>
                            )}
                          </button>
                          <button className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-green-700 transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap flex-1 sm:flex-none">
                            <Calendar size={14} className="sm:w-4 sm:h-4" />
                            Save & Schedule
                          </button>
                        </div>
                      )}
                    </div>

                    {selectedService.length > 0 ? (
                      <div className="border rounded overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="text-left px-2 sm:px-4 py-2 border-b">
                                Service Code
                              </th>
                              <th className="text-left px-2 sm:px-4 py-2 border-b">
                                Service Name
                              </th>
                              <th className="text-left px-2 sm:px-4 py-2 border-b">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedService.map((service) => (
                              <tr
                                key={service.id}
                                className="hover:bg-gray-50 transition"
                              >
                                <td className="px-2 sm:px-4 py-2 border-b">
                                  {service.serviceCode}
                                </td>
                                <td className="px-2 sm:px-4 py-2 border-b">
                                  {service.serviceName}
                                </td>
                                <td className="px-2 sm:px-4 py-2 border-b">
                                  <button
                                    onClick={() =>
                                      setSelectedService((prev) =>
                                        prev.filter((s) => s.id !== service.id)
                                      )
                                    }
                                    className="text-red-600 hover:text-red-800 transition font-medium"
                                  >
                                    Remove
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className=" border rounded p-4 sm:p-8 text-center text-xs sm:text-sm text-gray-500">
                        No service selected
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-5 md:mt-6 flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 md:gap-4">
              <button
                onClick={() => handleCancel("Dashboard")}
                className="bg-gray-300 text-gray-700 px-4 sm:px-8 py-2.5 sm:py-2 rounded-lg hover:bg-gray-400 transition font-medium text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
