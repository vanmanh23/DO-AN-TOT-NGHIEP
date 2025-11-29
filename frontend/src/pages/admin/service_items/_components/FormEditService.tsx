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
  ServiceItemRequest,
} from "../../../../types/order";
import serviceItemsApis from "../../../../apis/serviceItemsApis";
import { toast } from "sonner";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  serviceItem?: ServiceItem;
  isCreate?: boolean;
};

export default function FormEditService({
  open,
  setOpen,
  serviceItem,
  isCreate,
}: Props) {
  const [modalityOptions, setModalityOptions] = useState<Modality[]>([]);

  const [formData, setFormData] = useState<ServiceItemRequest>();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    } as ServiceItemRequest);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!serviceItem) return;
      const response = await serviceItemsApis.update(
        serviceItem?.id,
        formData as ServiceItemRequest
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
      const response = await serviceItemsApis.create(
        formData as ServiceItemRequest
      );
      toast.success("Create service successfully!", {
        duration: 2000,
        richColors: true,
      });
      setOpen(false);
      console.log("Create service successfully:", response);
      window.location.reload();
    } catch (error) {
      toast.error("Create service failed!", {
        duration: 2000,
        richColors: true,
      });
      console.error("Error creating service:", error);
    }
  };

  useEffect(() => {
    if (!isCreate && serviceItem) {
      setFormData({
        serviceCode: serviceItem.serviceCode,
        serviceName: serviceItem.serviceName,
        unitPrice: serviceItem.unitPrice,
        modalityId: serviceItem.modality.id,
      });
    }
    const fetchData = async () => {
      const res = await serviceItemsApis.findAllModalities();
      setModalityOptions(res.result as unknown as Modality[]);
    };

    fetchData();

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
            {/* 1. Service Code */}
            <div className="mb-4">
              <label
                htmlFor="serviceCode"
                className="block text-sm font-medium text-gray-700"
              >
                Service Code
              </label>
              <input
                type="text"
                id="serviceCode"
                name="serviceCode"
                value={formData?.serviceCode}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* 2. Service Name */}
            <div className="mb-4">
              <label
                htmlFor="serviceName"
                className="block text-sm font-medium text-gray-700"
              >
                Service Name
              </label>
              <input
                type="text"
                id="serviceName"
                name="serviceName"
                value={formData?.serviceName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* 3. Modality (Equipment) */}
            <div className="mb-4">
              <label
                htmlFor="modalityId"
                className="block text-sm font-medium text-gray-700"
              >
                Modality (Equipment)
              </label>
              <select
                id="modalityId"
                name="modalityId"
                value={formData?.modalityId}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>-- Select Modality --</option>
                {modalityOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.type}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                ID: (Pre-selected)
              </p>
            </div>

            <div className="mb-6">
              <label
                htmlFor="unitPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Unit Price (VND)
              </label>
              <input
                type="number"
                id="unitPrice"
                name="unitPrice"
                value={formData?.unitPrice}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {isCreate ? (
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create New Service
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
