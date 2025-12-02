import React, { useEffect, useState } from "react";
import type { DoctorResponse, Patient } from "../../../../types/order";
import doctorsApi from "../../../../apis/doctorApis";
import orderApis from "../../../../apis/orderApis";
import { z } from "zod";
import { useFormContext } from "react-hook-form";
import { patientSchema } from "../../../../utils/schema";
interface Props {
  onChange: (data: Patient) => void;
  chooseDoctor?: (doctorId: string) => void;
  patientIdUpdate?: string;
  orderIdUpdate?: string;
}

export type PatientFormSchema = z.infer<typeof patientSchema>;

export default function PatientFormInfo({
  onChange,
  chooseDoctor,
  orderIdUpdate,
  patientIdUpdate,
}: Props) {
  const [allDoctors, setAllDoctors] = useState<DoctorResponse[]>([]);
  // const [selectedDoctor, setSelectedDoctor] = useState<DoctorResponse>();

  const [patientInfo, setPatientInfo] = useState<Patient>({
    name: "",
    birthdate: "",
    gender: "M",
    address: "",
    phoneNumber: "",
  });

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const newForm = { ...patientInfo, [name]: value };
    setPatientInfo(newForm);

    // báo ra parent
    onChange(newForm);
  };

  // ------------------ Doctor select -------------------------
  const handleGetDoctor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    chooseDoctor?.(e.target.value);
  };

  // ------------------ Age generator -------------------------
  const generateAgeFromBirthdate = (birthdate: string) => {
    if (!birthdate) return "";
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate()))
      age--;
    return age;
  };

  // ------------------ Load when update ----------------------
  useEffect(() => {
    if (!orderIdUpdate) return;

    const fetchOrderData = async () => {
      const res = await orderApis.getById(orderIdUpdate);

      const data: Patient = {
        name: res.result.patient?.patientName as string,
        birthdate: res.result.patient?.patientBirthDate as string,
        gender: res.result.patient?.gender as "M" | "F" | "O",
        address: res.result.patient?.address as string,
        phoneNumber: res.result.patient?.phoneNumber as string,
      };

      setPatientInfo(data);
      // setSelectedDoctor(res.result.doctor);
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
            <label className="text-sm font-medium">Họ tên *</label>
            <input
              type="text"
              value={patientInfo.name}
              {...register("name")}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">
                {errors.name.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          <div>
            <label className="text-sm font-medium">Tuổi</label>
            <input
              type="number"
              className="border rounded px-3 py-2 w-full"
              value={generateAgeFromBirthdate(patientInfo.birthdate)}
              disabled
            />
          </div>
          <div>
            <label className="text-sm font-medium">Ngày sinh *</label>
            <input
              type="date"
              value={patientInfo.birthdate}
              {...register("birthdate")}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
            {errors.birthdate && (
              <p className="text-red-500 text-xs">
                {errors.birthdate.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Giới tính *</label>
            <select
              value={patientInfo.gender}
              {...register("gender")}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="M">Nam</option>
              <option value="F">Nữ</option>
              <option value="O">Khác</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs">
                {errors.gender.message as string}
              </p>
            )}
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
          <div>
            <label className="text-sm font-medium">Phone *</label>
            <input
              type="text"
              value={patientInfo.phoneNumber}
              {...register("phoneNumber")}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">
                {errors.phoneNumber.message as string}
              </p>
            )}
          </div>
        </div>
        {/* Địa chỉ */}
        <div>
          <label className="text-sm font-medium">Địa chỉ *</label>
          <input
            type="text"
            value={patientInfo.address}
            {...register("address")}
            onChange={handleInputChange}
            className="border rounded px-3 py-2 w-full"
          />
          {errors.address && (
            <p className="text-red-500 text-xs">
              {errors.address.message as string}
            </p>
          )}
        </div>

        {/* Bác sĩ chỉ định & Khoa chỉ định */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3 md:gap-4">
          <div>
            <label className="text-sm font-medium">Bác sĩ chỉ định</label>
            <select
              onChange={handleGetDoctor}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">-- Chọn bác sĩ --</option>
              {allDoctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.fullName}
                </option>
              ))}
            </select>
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
