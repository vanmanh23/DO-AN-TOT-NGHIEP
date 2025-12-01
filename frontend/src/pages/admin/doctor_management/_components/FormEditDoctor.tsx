import { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "../../../../components/ui/dialog";
import type { DoctorResponse } from "../../../../types/order";
import { toast } from "sonner";
import doctorsApi from "../../../../apis/doctorApis";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  doctors?: DoctorResponse;
  isCreate?: boolean;
};

export default function FormEditService({
  open,
  setOpen,
  doctors,
  isCreate,
}: Props) {
  const [formData, setFormData] = useState<DoctorResponse>();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    } as DoctorResponse);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!doctors) return;
      const response = await doctorsApi.update(
        doctors?.id as string,
        formData as DoctorResponse
      );
      toast.success("Update service successfully!", {
        duration: 2000,
        richColors: true,
      });
      setOpen(false);
      console.log("Update service successfully:", response);
      window.location.reload();
    } catch (error) {
      toast.error("Update service failed!", {
        duration: 2000,
        richColors: true,
      });
      console.error("Error updating service:", error);
    }
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await doctorsApi.create(formData as DoctorResponse);
      toast.success("Create doctor successfully!", {
        duration: 2000,
        richColors: true,
      });
      setOpen(false);
      console.log("Create doctor successfully:", response);
      window.location.reload();
    } catch (error) {
      toast.error("Create doctor failed!", {
        duration: 2000,
        richColors: true,
      });
      console.error("Error creating doctor:", error);
    }
  };

  useEffect(() => {
    if (!isCreate && doctors) {
      setFormData({
        fullName: doctors.fullName,
        dateOfBirth: doctors.dateOfBirth,
        gender: doctors.gender,
        phoneNumber: doctors.phoneNumber,
        email: doctors.email,
        address: doctors.address,
        specialization: doctors.specialization,
        degree: doctors.degree,
        yearsOfExperience: doctors.yearsOfExperience,
        clinicRoom: doctors.clinicRoom,
        status: doctors.status,
      });
    }
    return () => {
      // cleanup code here if needed
    };
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[80vh] bg-white">
        <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
          {isCreate ? (
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              📝 Create New Service
            </h2>
          ) : (
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              📝 Update Service Information
            </h2>
          )}
          <form onSubmit={isCreate ? handleCreate : handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="serviceCode"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData?.fullName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {/*  */}

            {/* 2. Date of Birth */}
            <div className="mb-4">
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData?.dateOfBirth || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* 3. Gender (Select Dropdown) */}
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData?.gender || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* 4. Phone Number */}
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData?.phoneNumber || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* 5. Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData?.email || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* 6. Address (Textarea) */}
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                value={formData?.address || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>

            {/* 7. Specialization */}
            <div className="mb-4">
              <label
                htmlFor="specialization"
                className="block text-sm font-medium text-gray-700"
              >
                Specialization
              </label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={formData?.specialization || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* 8. Degree */}
            <div className="mb-4">
              <label
                htmlFor="degree"
                className="block text-sm font-medium text-gray-700"
              >
                Degree/Qualification
              </label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={formData?.degree || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* 9. Years of Experience (Number Input) */}
            <div className="mb-4">
              <label
                htmlFor="yearsOfExperience"
                className="block text-sm font-medium text-gray-700"
              >
                Years of Experience
              </label>
              <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData?.yearsOfExperience || ""}
                onChange={handleChange}
                min="0"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* 10. Clinic Room */}
            <div className="mb-4">
              <label
                htmlFor="clinicRoom"
                className="block text-sm font-medium text-gray-700"
              >
                Clinic/Room Number
              </label>
              <input
                type="text"
                id="clinicRoom"
                name="clinicRoom"
                value={formData?.clinicRoom || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* 11. Status (Select Dropdown) */}
            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Employment Status
              </label>
              <select
                id="status"
                name="status"
                value={formData?.status || ""}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            {/*  */}
            {isCreate ? (
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create New Doctor
              </button>
            ) : (
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Update
              </button>
            )}
          </form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="hover:bg-gray-500/50">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
