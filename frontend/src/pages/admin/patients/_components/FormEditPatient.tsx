import { useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "../../../../components/ui/dialog";
import type { PatientResponse } from "../../../../types/order";
import { toast } from "sonner";
import { patientEdtSchema } from "../../../../utils/schema";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import patientApi from "../../../../apis/patientApis";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  patientEdit?: PatientResponse;
  isCreate?: boolean;
};
type PatientEdtSchema = z.infer<typeof patientEdtSchema>;
export default function FormEditPatient({
  open,
  setOpen,
  patientEdit,
  isCreate,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PatientEdtSchema>({
    resolver: zodResolver(patientEdtSchema),
  });

  useEffect(() => {
    if (!isCreate && patientEdit) {
      reset({
        name: patientEdit.patientName,
        birthdate: patientEdit.patientBirthDate,
        gender: patientEdit.gender as "M" | "F" | "O",
        phoneNumber: patientEdit.phoneNumber,
        address: patientEdit.address,
        gmail: patientEdit.gmail,
        identityCard: patientEdit.identityCard,
      });
    }
  }, [patientEdit, isCreate, reset]);

  const onUpdate = async (data: PatientEdtSchema) => {
    try {
      if (!patientEdit) return;

      await patientApi.update(patientEdit.id as string, data);

      toast.success("Update patient successfully!", {
        duration: 2000,
        richColors: true,
      });
      setOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error("Update patient failed!", {
        duration: 2000,
        richColors: true,
      });
      console.error(error);
    }
  };

  const onCreate = async (data: PatientEdtSchema) => {
    try {
      await patientApi.create(data);

      toast.success("Create patient successfully!", {
        duration: 2000,
        richColors: true,
      });
      setOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error("Create patient failed!", {
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
          <form
            onSubmit={
              isCreate ? handleSubmit(onCreate) : handleSubmit(onUpdate)
            }
          >
            <div className="mb-4">
              <label className="block text-sm font-medium">Patient Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                {...register("name")}
                className="mt-1 w-full border px-3 py-2 rounded"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Gender <span className="text-red-500">*</span></label>
              <select
                {...register("gender")}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Date of Birth <span className="text-red-500">*</span></label>
              <input
                type="date"
                {...register("birthdate")}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              />
              {errors.birthdate && (
                <p className="text-red-500 text-sm">
                  {errors.birthdate.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Phone Number <span className="text-red-500">*</span></label>
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
            <div className="mb-6">
              <label className="block text-sm font-medium">Address <span className="text-red-500">*</span></label>
              <textarea
                rows={3}
                {...register("address")}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium">Gmail</label>
              <input
                type="email"
                {...register("gmail")}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              ></input>
              {errors.gmail && (
                <p className="text-red-500 text-sm">{errors.gmail.message}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium">Identity Card <span className="text-red-500">*</span></label>
              <input
                type="text"
                {...register("identityCard")}
                className="mt-1 block w-full px-3 py-2 border rounded-md"
              ></input>
              {errors.identityCard && (
                <p className="text-red-500 text-sm">{errors.identityCard.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded shadow"
            >
              {isCreate ? "Create New Patient" : "Save Update"}
            </button>
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
