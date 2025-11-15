import { useQuery } from "@tanstack/react-query";
import { Calendar, FileText, Plus, Save, Search } from "lucide-react";
import { useState } from "react";
import orderApis from "../../../apis/orderApis";
import type { ServiceItem } from "../../../types/order";

export default function Component() {
  const [patientInfo, setPatientInfo] = useState({
    patientId: "",
    patientCode: "",
    name: "",
    age: "",
    dob: "",
    gender: "Nam",
    cccdCode: "",
    address: "",
    diagnosis: "",
    department: "Khoa CĐHA",
    note: "",
  });

  // const [services, setServices] = useState<ServiceItem[]>([]);
  const [serviceType, setServiceType] = useState("CT");
  const [selectedService, setSelectedService] = useState<ServiceItem[]>([]);
  const [serviceList, setServiceList] = useState<ServiceItem[]>([]);
  const [currentService, setCurrentService] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo((prev) => ({ ...prev, [name]: value }));
  };
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
  console.log("selectedService", selectedService);
  const getAllServices = async () => {
    try {
      const response = await orderApis.getByType(serviceType);
      // if(response && response.result) {
      //   setServiceList(response.result[0].serviceItems);
      // }
      response.result?.forEach((item) => setServiceList(item.serviceItems));
      return response.result;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dịch vụ:", error);
      return [];
    }
  };
  // Sử dụng useQuery
  const { data, isLoading, error, isError } = useQuery({
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

  //   if (data && data[0]) {
  //   setServiceList(data[0]?.serviceItems);
  // }
  console.log("setServiceList", serviceList);
  const handleSave = () => {
    alert("Lưu yêu cầu thành công!");
  };
  console.log("Dữ liệu nhận được từ useQuery:", data);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb
      <div className="bg-white px-6 py-2 border-b text-sm text-gray-600">
        Trang chủ / Yêu cầu CĐHA / Thêm mới yêu cầu
      </div> */}

      {/* Success Message
      <div className="bg-green-500 text-white px-6 py-3 text-center font-medium">
        Lưu phiếu chỉ định thành công!
      </div> */}

      <div className="p-3 sm:p-4 md:p-6 lg:p-6">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {/* Patient Information Section */}
          <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-6">
            <h2 className="text-base sm:text-lg md:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
              <span className="text-blue-600 text-lg sm:text-xl">👤</span>
              <span className="truncate">THÔNG TIN BỆNH NHÂN</span>
            </h2>

            <div className="space-y-3 sm:space-y-3 md:space-y-4">
              {/* Kiểu BN & Họ tên */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3 md:gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                    Kiểu BN <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500">
                    <option>HIS</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                    Họ tên <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-1 sm:gap-2">
                    <input
                      type="text"
                      name="name"
                      value={patientInfo.name}
                      onChange={handleInputChange}
                      placeholder="TÌM KIẾM MÃ, HỌ TÊN, SỐ BHYT"
                      className="flex-1 border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Tuổi, Ngày sinh, Giới tính */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                    Tuổi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={patientInfo.age}
                    onChange={handleInputChange}
                    className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={patientInfo.dob}
                    onChange={handleInputChange}
                    className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                    Giới tính <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={patientInfo.gender}
                    onChange={handleInputChange}
                    className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option>Nam</option>
                    <option>Nữ</option>
                  </select>
                </div>
              </div>

              {/* Mã số cccd */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                  Mã số cccd/cmt <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cccdCode"
                  value={patientInfo.cccdCode}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Địa chỉ */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                  Địa chỉ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={patientInfo.address}
                  onChange={handleInputChange}
                  placeholder="Địa chỉ của bệnh nhân"
                  className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Bác sĩ chỉ định & Khoa chỉ định */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3 md:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                    Bác sĩ chỉ định
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                    Khoa chỉ định
                  </label>
                  <select
                    name="department"
                    value={patientInfo.department}
                    onChange={handleInputChange}
                    className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option>Khoa CĐHA</option>
                    <option>Khoa Nội</option>
                    <option>Khoa Ngoại</option>
                  </select>
                </div>
              </div>

              {/* Lời dặn */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                  Lời dặn
                </label>
                <textarea
                  name="note"
                  value={patientInfo.note}
                  onChange={handleInputChange}
                  placeholder="Lời dặn cho phiếu chỉ định"
                  rows={3}
                  className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Service Request Section */}
          <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-6">
            <h2 className="text-base sm:text-lg md:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
              <span className="text-blue-600 text-lg sm:text-xl">📋</span>
              <span className="truncate">DỊCH VỤ CHẨN ĐOÁN HÌNH ẢNH</span>
            </h2>

            <div className="space-y-3 sm:space-y-3 md:space-y-4">
              {/* Loại thiết bị */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                  Loại thiết bị <span className="text-red-500">*</span>
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
                </select>
              </div>

              {/* Dịch vụ */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                  Dịch vụ <span className="text-red-500">*</span>
                </label>

                <div className="flex gap-1 sm:gap-2">
                  <select
                    value={currentService}
                    onChange={(e) => setCurrentService(e.target.value)}
                    className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500 "
                  >
                    <option value="">-- Chọn dịch vụ --</option>
                    {serviceList.map((service) => (
                      <option
                        key={service.serviceCode}
                        value={service.serviceName}
                      >
                        {service.serviceName}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAddToSelected}
                    className="bg-blue-600 text-white px-2 sm:px-4 py-2 rounded hover:bg-blue-700 transition flex-shrink-0"
                  >
                    <Plus size={14} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              {/* Danh sách dịch vụ */}
              <div className="border-t pt-3 sm:pt-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <h3 className="text-xs sm:text-sm font-medium">
                    Danh sách dịch vụ
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto">
                    <button
                      // onClick={}
                      className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap flex-1 sm:flex-none"
                    >
                      <FileText size={14} className="sm:w-4 sm:h-4" />
                      LƯU YÊU CẦU
                    </button>
                    <button className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-green-700 transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap flex-1 sm:flex-none">
                      <Calendar size={14} className="sm:w-4 sm:h-4" />
                      LƯU & LẬP LỊCH
                    </button>
                  </div>
                </div>

                {selectedService.length > 0 ? (
                  <div className="border rounded overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-2 sm:px-4 py-2 border-b">
                            Mã dịch vụ
                          </th>
                          <th className="text-left px-2 sm:px-4 py-2 border-b">
                            Tên dịch vụ
                          </th>
                          <th className="text-left px-2 sm:px-4 py-2 border-b">
                            Thao tác
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
                                Xóa
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="border rounded p-4 sm:p-8 text-center text-xs sm:text-sm text-gray-500">
                    Chưa có dịch vụ nào được chọn
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 sm:mt-5 md:mt-6 flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 md:gap-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-1 sm:gap-2 font-medium text-sm sm:text-base"
          >
            <Save size={16} className="sm:w-5 sm:h-5" />
            LƯU PHIẾU CHỈ ĐỊNH
          </button>
          <button className="bg-gray-300 text-gray-700 px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-gray-400 transition font-medium text-sm sm:text-base">
            HỦY BỎ
          </button>
        </div>
      </div>
    </div>
  );
}
