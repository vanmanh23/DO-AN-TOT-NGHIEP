import { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "../../../../components/ui/dialog";
import type { Department, Modality } from "../../../../types/order";
import { toast } from "sonner";
import devicesApi from "../../../../apis/deviceApis";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  devices?: Modality;
  isCreate?: boolean;
};

export default function FormEditService({
  open,
  setOpen,
  devices,
  isCreate,
}: Props) {
  const [departmentOptions, setDepartmentOptions] = useState<Department[]>([]);

  const [formData, setFormData] = useState<Modality>();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    } as Modality);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!devices) return;
      const response = await devicesApi.update(
        devices?.id as string,
        formData as Modality
      );
      toast.success("Update device successfully!", {
        duration: 2000,
        richColors: true,
      });
      setOpen(false);
      console.log("Update device successfully:", response);
      window.location.reload();
    } catch (error) {
      toast.error("Update device failed!", {
        duration: 2000,
        richColors: true,
      });
      console.error("Error updating device:", error);
    }
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Creating device with data:", formData);
    try {
      const createDepartment = await devicesApi.createDepartment({
        name: formData?.nameDepartment as string,
        location: formData?.locationDepartment as string,
      });
      formData!.departmentId = createDepartment.result.id;
      const response = await devicesApi.create({
        ...(formData as Modality),
        departmentId: createDepartment.result.id,
      });
      toast.success("Create device successfully!", {
        duration: 2000,
        richColors: true,
      });
      setOpen(false);
      console.log("Create device successfully:", response);
      window.location.reload();
    } catch (error) {
      toast.error("Create device failed!", {
        duration: 2000,
        richColors: true,
      });
      console.error("Error creating device:", error);
    }
  };

  useEffect(() => {
    if (!isCreate && devices) {
      setFormData({
        type: devices.type,
        manufacturer: devices.manufacturer,
        model: devices.model,
        status: devices.status,
        departmentId: devices.departmentId,
      });
    }
    const fetchData = async () => {
      const res = await devicesApi.getAllDepartments();
      setDepartmentOptions(res.result as unknown as Department[]);
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
            {/* 2. Service Name */}
            {isCreate && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name Department
                  </label>
                  <input
                    type="text"
                    id="nameDepartment"
                    name="nameDepartment"
                    value={formData?.nameDepartment}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    location
                  </label>
                  <input
                    type="text"
                    id="locationDepartment"
                    name="locationDepartment"
                    value={formData?.locationDepartment}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </>
            )}

            {/*  */}
            <div className="mb-4">
              <label
                htmlFor="model"
                className="block text-sm font-medium text-gray-700"
              >
                Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData?.model}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* 2. Service Name */}
            <div className="mb-4">
              <label
                htmlFor="manufacturer"
                className="block text-sm font-medium text-gray-700"
              >
                manufacturer
              </label>
              <input
                type="text"
                id="manufacturer"
                name="manufacturer"
                value={formData?.manufacturer}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* 3. Modality (Equipment) */}
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                type
              </label>
              <select
                id="type"
                name="type"
                value={formData?.type}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>-- Select type --</option>
                <option value="CT">CT</option>
                <option value="MRI">MRI</option>
                <option value="XRAY">XRAY</option>
                <option value="US">US</option>
                <option value="MAMMO">MAMMO</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">ID: (Pre-selected)</p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                status
              </label>
              <select
                id="status"
                name="status"
                value={formData?.status}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>-- Select status --</option>
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">ID: (Pre-selected)</p>
            </div>

            {!isCreate && (
              <div className="mb-4">
                <label
                  htmlFor="departmentId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department
                </label>
                <select
                  id="departmentId"
                  name="departmentId"
                  value={formData?.departmentId}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>-- Select department --</option>
                  {departmentOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name} - {option.location}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">ID: (Pre-selected)</p>
              </div>
            )}

            {isCreate ? (
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create New Device
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
