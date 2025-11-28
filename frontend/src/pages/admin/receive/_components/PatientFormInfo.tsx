import React, { useEffect, useState } from "react";
import type { DoctorResponse, Patient } from "../../../../types/order";
import doctorsApi from "../../../../apis/doctorApis";
import orderApis from "../../../../apis/orderApis";
interface Props {
  onChange: (data: Patient) => void;
  chooseDoctor?: (doctorId: string) => void;
  patientIdUpdate?: string;
  orderIdUpdate?: string;
}
export default function PatientFormInfo({
  onChange,
  chooseDoctor,
  orderIdUpdate,
  patientIdUpdate
}: Props) {
  const [allDoctors, setAllDoctors] = useState<DoctorResponse[]>([]);
  const [selecteDoctor, setSelectedDoctor] = useState<DoctorResponse>();
  const [patientInfo, setPatientInfo] = useState<Patient>({
    name: "",
    birthdate: "",
    gender: "M",
    address: "",
    phoneNumber: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newForm = { ...patientInfo, [name]: value };
    setPatientInfo(newForm);
    onChange(newForm);

  };

  const handleGetDoctor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const doctor = e.target;
      chooseDoctor(doctor.value);
  };
  const generateAgeFromBirthdate = (birthdate: string) => {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      const res = await orderApis.getById(orderIdUpdate as string);
      setPatientInfo(
        {
          name: res.result.patient?.patientName as string,
          birthdate: res.result.patient?.patientBirthDate as string,
          gender: res.result.patient?.gender as "M" | "F" | "O",
          address: res.result.patient?.address as string,
          phoneNumber: res.result.patient?.phoneNumber as string,
        }
      )
      setSelectedDoctor(res.result.doctor as DoctorResponse);
    };
    fetchOrderData();
  }, [orderIdUpdate]);

  useEffect(() => {
    const fetchAllDoctors = async () => {
      const res = await doctorsApi.getAll();
      setAllDoctors(res.result);
    };
    fetchAllDoctors();
  }, []);
  return (
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
                value={patientInfo?.name}
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
              value={generateAgeFromBirthdate(
                patientInfo?.birthdate
              ).toString()}
              // onChange={handleInputChange}
              className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
              Ngày sinh
            </label>
            <input
              type="date"
              name="birthdate"
              value={patientInfo?.birthdate}
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
              value={patientInfo?.gender}
              onChange={handleInputChange}
              className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            >
              <option value={"M"}>Nam</option>
              <option value={"F"}>Nữ</option>
              <option value={"0"}>khác</option>
            </select>
          </div>
        </div>

        {/* Mã số cccd */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 sm:gap-3 md:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
              Mã số cccd/cmt <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="cccdCode"
              // value={patientInfo.cccdCode}
              // onChange={handleInputChange}
              className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* sdt */}
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
              PhoneNumber <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={patientInfo?.phoneNumber}
              onChange={handleInputChange}
              className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        {/* Địa chỉ */}
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
            Địa chỉ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={patientInfo?.address}
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
            <select
              name="department"
              value={selecteDoctor?.fullName}
              onChange={handleGetDoctor}
              className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">-- Chọn bác sĩ --</option>
              {allDoctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.fullName}
                </option>
              ))}
            </select>
            {/* <input
                    type="text"
                    className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                  /> */}
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
              Khoa chỉ định
            </label>
            <select
              name="department"
              // value={patientInfo.department}
              // onChange={handleInputChange}
              className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            >
              <option>Khoa CĐHA</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
