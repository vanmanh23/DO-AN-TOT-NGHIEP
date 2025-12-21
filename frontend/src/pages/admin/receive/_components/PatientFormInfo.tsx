import React, { useEffect, useState } from "react";
import type {
  DoctorResponse,
  Patient,
  PatientDTO,
} from "../../../../types/order";
import doctorsApi from "../../../../apis/doctorApis";
import orderApis from "../../../../apis/orderApis";
import { z } from "zod";
import { useFormContext } from "react-hook-form";
import { patientSchema } from "../../../../utils/schema";
import patientApi from "../../../../apis/patientApis";
import { Search } from "lucide-react";
interface Props {
  chooseDoctor?: (doctorId: string) => void;
  patientIdUpdate?: string;
  orderIdUpdate?: string;
  isNotCreate: (status: boolean) => void;
  patientAvailable: (patient: PatientDTO) => void;
}

export type PatientFormSchema = z.infer<typeof patientSchema>;

export default function PatientFormInfo({
  chooseDoctor,
  orderIdUpdate,
  isNotCreate,
  patientAvailable,
}: Props) {
  const [allDoctors, setAllDoctors] = useState<DoctorResponse[]>([]);
  const [typeOfPatient, setTypeOfPatient] = useState("re_visit");
  const [findPatient, setFindPatient] = useState("");
  const {
    register,
    reset,
    watch,
    formState: { errors },
  } = useFormContext();

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

  const getNameToFindPatient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindPatient(e.target.value);
  };

  const selectTypeOfPatient = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeOfPatient(e.target.value);
    const { value } = e.target;
    if (value === "re_visit") {
      isNotCreate(true);
    }
    if (value === "first_visit") {
      isNotCreate(false);
    }
    reset({
      name: "",
      birthdate: "",
      gender: "M",
      address: "",
      phoneNumber: "",
      identityCard: "",
      gmail: "",
    });
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
        identityCard: res.result.patient?.identityCard as string,
        gmail: res.result.patient?.gmail as string,
      };

      // setPatientInfo(data);
      reset({
        name: data.name,
        birthdate: data.birthdate,
        gender: data.gender,
        address: data.address,
        phoneNumber: data.phoneNumber,
        identityCard: data.identityCard,
        gmail: data.gmail,
      });
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

  const handleFindPatient = async () => {
    const res = await patientApi.getById(findPatient);
    patientAvailable(res.result);
    const data: Patient = {
      name: res.result.name as string,
      birthdate: res.result.birthdate as string,
      gender: res.result.gender as "M" | "F" | "O",
      address: res.result.address as string,
      phoneNumber: res.result.phoneNumber as string,
      identityCard: res.result.identityCard as string,
      gmail: res.result.gmail as string,
    };
    reset({
      name: data.name,
      birthdate: data.birthdate,
      gender: data.gender,
      address: data.address,
      phoneNumber: data.phoneNumber,
      identityCard: data.identityCard,
      gmail: data.gmail,
    });
    // setPatientInfo(data);
    setTypeOfPatient("");
    setFindPatient("");
  };

  return (
    <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-6">
      <h2 className="text-base sm:text-lg md:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
        <span className="text-blue-600 text-lg sm:text-xl">👤</span>
        <span className="truncate">Patient Information</span>
      </h2>

      <div className="space-y-3 sm:space-y-3 md:space-y-4">
        {/* Patient Type & Full Name */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3 md:gap-4">
          <div className="sm:col-span-1">
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
              Type of patient <span className="text-red-500">*</span>
            </label>
            <select
              value={typeOfPatient}
              onChange={selectTypeOfPatient}
              className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            >
              <option value={"re_visit"}>Re-visit</option>
              <option value={"first_visit"}>First-visit</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                defaultValue={
                  typeOfPatient === "re_visit" ? findPatient : ""
                }
                // value={
                //   typeOfPatient === "re_visit" ? findPatient : patientInfo.name
                // }
                {...register("name")}
                onChange={
                  typeOfPatient === "re_visit"
                    ? getNameToFindPatient
                    : undefined
                }
                placeholder={`${
                  typeOfPatient === "re_visit" ? "Search by ID or name" : ""
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && typeOfPatient === "re_visit") {
                    handleFindPatient();
                  }
                }}
                className="border rounded px-3 py-2 w-full"
              />
              {typeOfPatient === "re_visit" && (
                <Search
                  onClick={handleFindPatient}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
              )}
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs">
                {errors.name.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          <div>
            <label className="text-sm font-medium">Age</label>
            <input
              type="number"
              className="border rounded px-3 py-2 w-full"
              value={generateAgeFromBirthdate(watch("birthdate"))}
              disabled
            />
          </div>
          <div>
            <label className="text-sm font-medium">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("birthdate")}
              readOnly={typeOfPatient === "re_visit" ? true : false}
              className="border rounded px-3 py-2 w-full outline-blue-500"
            />
            {errors.birthdate && (
              <p className="text-red-500 text-xs">
                {errors.birthdate?.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              {...register("gender")}
              disabled={typeOfPatient === "re_visit"}
              className="border rounded px-3 py-2 w-full outline-blue-500"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs">
                {errors.gender.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("gmail")}
              className="border rounded px-3 py-2 w-full outline-blue-500"
              readOnly={typeOfPatient === "re_visit" ? true : false}
            ></input>
            {errors.gmail && (
              <p className="text-red-500 text-xs">
                {errors.gmail?.message as string}
              </p>
            )}
          </div>
        </div>
        {/* Identity number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 sm:gap-3 md:gap-4">
          <div>
            <label className="text-sm font-medium">
              Identity Card <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("identityCard")}
              readOnly={typeOfPatient === "re_visit" ? true : false}
              className="border rounded px-3 py-2 w-full outline-blue-500"
            />
            {errors.identityCard && (
              <p className="text-red-500 text-xs">
                {errors.identityCard?.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("phoneNumber")}
              readOnly={typeOfPatient === "re_visit" ? true : false}
              className="border rounded px-3 py-2 w-full outline-blue-500"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">
                {errors.phoneNumber?.message as string}
              </p>
            )}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("address")}
            readOnly={typeOfPatient === "re_visit" ? true : false}
            className="border rounded px-3 py-2 w-full outline-blue-500"
          />
          {errors.address && (
            <p className="text-red-500 text-xs">
              {errors.address?.message as string}
            </p>
          )}
        </div>

        {/* Assigned Doctor & Assigned Department */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3 md:gap-4">
          <div>
            <label className="text-sm font-medium">Assigned Doctor</label>
            <select
              onChange={handleGetDoctor}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">-- Select doctor --</option>
              {allDoctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.fullName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2">
              Assigned Department
            </label>
            <select
              name="department"
              // value={patientInfo.department}
              // onChange={handleInputChange}
              className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500"
            >
              <option>Diagnostic Imaging</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
