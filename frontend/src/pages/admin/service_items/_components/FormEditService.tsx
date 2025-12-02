import { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "../../../../components/ui/dialog";
import type {
  Modality,
  ServiceItem,
  // ServiceItemRequest,
} from "../../../../types/order";
import serviceItemsApis from "../../../../apis/serviceItemsApis";
import { toast } from "sonner";
import { serviceItemSchema } from "../../../../utils/schema";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  serviceItem?: ServiceItem;
  isCreate?: boolean;
};
type ServiceItemSchema = z.infer<typeof serviceItemSchema>;
export default function FormEditService({
  open,
  setOpen,
  serviceItem,
  isCreate,
}: Props) {
   const [modalityOptions, setModalityOptions] = useState<Modality[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceItemSchema>({
    resolver: zodResolver(serviceItemSchema),
  });

  useEffect(() => {
    if (!isCreate && serviceItem) {
      reset({
        serviceCode: serviceItem.serviceCode,
        serviceName: serviceItem.serviceName,
        unitPrice: serviceItem.unitPrice,
        modalityId: serviceItem.modality.id,
      });
    }

    const fetchData = async () => {
      const res = await serviceItemsApis.findAllModalities();
      setModalityOptions(res.result as Modality[]);
    };

    fetchData();
  }, [serviceItem, isCreate, reset]);

  const onUpdate = async (data: ServiceItemSchema) => {
    try {
      if (!serviceItem) return;

      await serviceItemsApis.update(serviceItem.id, data);

      toast.success("Update service successfully!", { duration: 2000, richColors: true });
      setOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error("Update service failed!", { duration: 2000, richColors: true });
      console.error(error);
    }
  };

  const onCreate = async (data: ServiceItemSchema) => {
    try {
      await serviceItemsApis.create(data);

      toast.success("Create service successfully!", { duration: 2000, richColors: true });
      setOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error("Create service failed!", { duration: 2000, richColors: true });
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
            <form onSubmit={isCreate ? handleSubmit(onCreate) : handleSubmit(onUpdate)}>
            {/* 1. Service Code */}
            <div className="mb-4">
                <label className="block text-sm font-medium">Service Code</label>
              <input
                type="text"
                {...register("serviceCode")}
                className="mt-1 w-full border px-3 py-2 rounded"
              />
              {errors.serviceCode && (
                <p className="text-sm text-red-600">{errors.serviceCode.message}</p>
              )}
            </div>

            {/* 2. Service Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Service Name</label>
              <input
                type="text"
                {...register("serviceName")}
                className="mt-1 w-full border px-3 py-2 rounded"
              />
              {errors.serviceName && (
                <p className="text-sm text-red-600">{errors.serviceName.message}</p>
              )}
            </div>

            {/* 3. Modality (Equipment) */}
            <div className="mb-4">
               <label className="block text-sm font-medium">Modality</label>
              <select
                {...register("modalityId")}
                className="mt-1 w-full border px-3 py-2 rounded"
              >
                <option value="">-- Select Modality --</option>

                {modalityOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.type}
                  </option>
                ))}
                </select>
              {errors.modalityId && (
                <p className="text-sm text-red-600">{errors.modalityId.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium">Unit Price (VND)</label>
              <input
                type="number"
                {...register("unitPrice", { valueAsNumber: true })}
                className="mt-1 w-full border px-3 py-2 rounded"
              />
              {errors.unitPrice && (
                <p className="text-sm text-red-600">{errors.unitPrice.message}</p>
              )}
            </div>
             <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded shadow"
            >
              {isCreate ? "Create New Service" : "Save Update"}
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
