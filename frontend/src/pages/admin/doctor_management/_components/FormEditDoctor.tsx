import { useEffect } from "react";
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
import { doctorSchema } from "../../../../utils/schema";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  doctors?: DoctorResponse;
  isCreate?: boolean;
};

type DoctorSchema = z.infer<typeof doctorSchema>;

export default function FormEditService({
  open,
  setOpen,
  doctors,
  isCreate,
}: Props) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DoctorSchema>({
    resolver: zodResolver(doctorSchema),
  });

  useEffect(() => {
    if (!isCreate && doctors) {
      reset({
        fullName: doctors?.fullName,
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
  }, [doctors, isCreate, reset]);

  const onUpdate = async (data: DoctorSchema)=> {
    try {
      if (!doctors) return;

      await doctorsApi.update(doctors.id as string, data);

      toast.success("Update doctor successfully!", {
        duration: 2000,
        richColors: true,
      });
      setOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error("Update doctor failed!", {
        duration: 2000,
        richColors: true,
      });
      console.error(error);
    }
  };

  const onCreate = async (data: DoctorSchema) => {
    try {
      await doctorsApi.create(data);

      toast.success("Create doctor successfully!", {
        duration: 2000,
        richColors: true,
      });
      setOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error("Create doctor failed!", {
        duration: 2000,
        richColors: true,
      });
      console.error(error);
    }
  };

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
          <form onSubmit={handleSubmit(isCreate ? onCreate : onUpdate)}>
            <div className="mb-4">
              <label className="block text-sm font-medium">Full Name</label>
              <input
                {...register("fullName")}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                {...register("dateOfBirth")}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Gender</label>
              <select
                {...register("gender")}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                {...register("phoneNumber")}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                {...register("email")}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Address</label>
              <textarea
                rows={3}
                {...register("address")}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Specialization
              </label>
              <input
                {...register("specialization")}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Degree</label>
              <input
                {...register("degree")}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Years Of Experience
              </label>
              <input
                type="number"
                {...register("yearsOfExperience", { valueAsNumber: true })}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Clinic Room</label>
              <input
                {...register("clinicRoom")}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Status</label>
              <select
                {...register("status")}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            {/*  */}
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isCreate ? "Create New Doctor" : "Save Update"}
            </Button>
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
